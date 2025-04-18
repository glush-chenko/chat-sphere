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
import { useLocalStorageState, useNotifications } from '@toolpad/core';
import { BOOLEAN_CODEC } from '../../utils/booleanCodec.ts';

export const ForgotPass = () => {
  const notifications = useNotifications();
  const [value, setValue] = useLocalStorageState('open-forgot-password', null, {
    codec: BOOLEAN_CODEC,
  });

  const handleForgotPass = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // eslint-disable-next-line
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;

    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      notifications.show('Письмо для сброса пароля отправлено на ваш email.', {
        severity: 'info',
        autoHideDuration: 3000,
      });
    } catch (error) {
      if (error instanceof Error) {
        notifications.show(`${error.message}`, {
          severity: 'error',
          autoHideDuration: 3000,
        });
      } else {
        notifications.show('Произошла неизвестная ошибка.', {
          severity: 'error',
          autoHideDuration: 3000,
        });
      }
    }
    setValue(null);
  }, [notifications, setValue]);

  const handleCloseForgotPass = useCallback(() => {
    setValue(false);
  }, [setValue]);

  return (
    <Dialog
      open={!!value}
      onClose={handleCloseForgotPass}
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
        <Button onClick={handleCloseForgotPass} color="primary">
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};