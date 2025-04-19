import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { signInAnonymously, RecaptchaVerifier } from 'firebase/auth';
import { firebaseAuth } from '../../firebase/firebase-config.ts';
import { Session, useSession } from '../../context/session-context.tsx';
import { useNavigate } from 'react-router';

export const SubmitButton = () => {
  const { setSession } = useSession();
  const navigate = useNavigate();

  const handleAnonymousSignIn = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(firebaseAuth, 'recaptcha-container', {});

      const recaptchaContainer = document.getElementById('recaptcha-container');
      if (recaptchaContainer) {
        recaptchaContainer.style.display = "unset";
      }
      await recaptchaVerifier.render();
      const response = await recaptchaVerifier.verify();

      if (response) {
        const userCredential = await signInAnonymously(firebaseAuth);
        const user = userCredential.user;

        const userSession: Session = {
          user: {
            name: 'Аноним',
            email: user.email || '',
            image: user.photoURL || '',
          },
        };

        setSession(userSession);
        navigate('/', { replace: true });
      } else {
        console.error('Капча не пройдена');
      }
    } catch (error) {
      console.error('Ошибка анонимной аутентификации:', error);
    } finally {
      const recaptchaContainer = document.getElementById('recaptcha-container');
      if (recaptchaContainer) {
        recaptchaContainer.remove();
      }
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