import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { signInAnonymously } from 'firebase/auth';
import { firebaseAuth } from '../../firebase/firebase-config.ts';
import { Session, useSession } from '../../Session-context.tsx';
import { useNavigate } from 'react-router';

export const SubmitButton = () => {
  const { setSession } = useSession();
  const navigate = useNavigate();

  const handleAnonymousSignIn = async () => {
    try {
      const userCredential = await signInAnonymously(firebaseAuth);
      const user = userCredential.user;

      const userSession: Session = {
        user: {
          name: 'Анонимный пользователь',
          email: user.email || '',
          image: user.photoURL || '',
        },
      };
      setSession(userSession);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Ошибка анонимной аутентификации:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Button
        type="submit"
        variant="contained"
        color="info"
        disableElevation
        fullWidth
        sx={{ my: 2 }}
      >
        Войти
      </Button>
      <Divider />
      <Button sx={{ my: 2 }} variant="outlined" onClick={handleAnonymousSignIn}>
        Анонимный вход
      </Button>
    </Box>
  );
};