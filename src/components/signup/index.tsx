import { FormEvent, useCallback } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { registerUser } from '../../firebase/auth.ts';
import { useLocalStorageState, useNotifications } from '@toolpad/core';
import { BOOLEAN_CODEC } from '../../utils/booleanCodec.ts';

export const Signup = () => {
  const [value, setValue] = useLocalStorageState('open-signup', null, {
    codec: BOOLEAN_CODEC,
  });
  const notifications = useNotifications();

  const handleRegister = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;
    const password = formJson.password;

    const response = await registerUser(email, password);
    if (response.error) {
      notifications.show(`${response.error}`, {
        severity: "error",
        autoHideDuration: 3000,
      });
    } else {
      setValue(null);
      notifications.show(`${response.success}`, {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
  }, [notifications, setValue]);

  const handleCloseSignup = useCallback(() => {
    setValue(false);
  }, [setValue])

  return (
    <Dialog
      open={!!value}
      onClose={handleCloseSignup}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: handleRegister,
          sx: { padding: '1rem' },
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem' }}>Регистрация</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: 'center' }}>
          Пожалуйста, введите свой email и пароль для регистрации.
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
        <TextField
          label="Пароль"
          type="password"
          id="password"
          name="password"
          fullWidth
          margin="normal"
          size="small"
          required
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button type="submit" variant="contained" color="primary">
          Зарегистрироваться
        </Button>
        <Button onClick={handleCloseSignup} color="primary">
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};