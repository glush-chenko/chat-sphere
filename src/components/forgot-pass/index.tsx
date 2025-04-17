import { FormEvent, useCallback } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { sendPasswordResetEmail } from 'firebase/auth';
import { firebaseAuth } from '../../firebase/firebase-config.ts';
import { useNotifications } from '@toolpad/core';
import { useNavigate } from 'react-router';

interface ForgotPassProps {
  open: boolean,
  handleClose: () => void;
}

export const ForgotPass = (props: ForgotPassProps) => {
  const { open, handleClose } = props;
  const notifications = useNotifications();
  const navigate = useNavigate();

  const handleForgotPass = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;

    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      notifications.show('Письмо для сброса пароля отправлено на ваш email.', {
        severity: 'info',
        autoHideDuration: 3000,
      });
    } catch (error) {
      notifications.show('Ошибка при отправке письма', {
        severity: 'error',
        autoHideDuration: 3000,
      });
    }
    navigate('../');
  }, [navigate, notifications]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: handleForgotPass,
          sx: { padding: '1rem' },
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem' }}>
        Восстановление пароля
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: 'center' }}>
          Введите свой email для сброса.
        </DialogContentText>
        <TextField
          autoFocus
          label="Email"
          type="email"
          id="name"
          name="email"
          fullWidth
          size="small"
          margin="normal"
          required
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button type="submit" variant="contained" color="primary">
          Отправить письмо
        </Button>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};