import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { registerUser } from '../../firebase/auth.ts';

interface SignupProps {
  open: boolean,
  handleClose: () => void;
}

export const Signup = (props: SignupProps) => {
  const { open, handleClose } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleRegister = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;
    const password = formJson.password;

    const response = await registerUser(email, password);
    if (response.error) {
      console.error(response.error);
    } else {
      console.log(response.success);
    }
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          value={email}
          onChange={handleEmailChange}
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
          value={password}
          onChange={handlePasswordChange}
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
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};