import LinearProgress from '@mui/material/LinearProgress';
import { SignInPage } from '@toolpad/core/SignInPage';
import { Navigate, useNavigate } from 'react-router';
import { useSession, type Session } from '../../Session-context.tsx';
import { signInWithCredentials, signInWithGoogle } from '../../firebase/auth.ts';
import { PasswordField } from '../../components/auth/password-field.tsx';
import { EmailField } from '../../components/auth/email-field.tsx';
import backgroundImage from '../../assets/backg.png';
import { SubmitButton } from '../../components/auth/submit-button.tsx';
import { useCallback } from 'react';
import 'firebase/compat/auth';
import { AuthProvider, AuthResponse } from '@toolpad/core';
import { firebaseAuth } from '../../firebase/firebase-config.ts';
import { RecaptchaVerifier } from 'firebase/auth';

export const SignIn = () => {
  const { session, setSession, loading } = useSession();
  const navigate = useNavigate();

  const signIn = useCallback(async (
    provider: AuthProvider,
    formData: any,
    callbackUrl: string | undefined,
  ): Promise<AuthResponse> => {
    let result;
    try {
      const recaptchaVerifier = new RecaptchaVerifier(firebaseAuth, 'recaptcha-container', {});

      await recaptchaVerifier.render();
      await recaptchaVerifier.verify();

      if (provider.id === 'google') {
        // result = await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
        result = await signInWithGoogle();
      }
      if (provider.id === 'credentials') {
        const email = formData?.get('email') as string;
        const password = formData?.get('password') as string;

        if (!email || !password) {
          return { error: 'Почта и пароль обязательны' };
        }

        // result = await signInWithEmailAndPassword(firebaseAuth, email, password);
        result = await signInWithCredentials(email, password);
      }

      if (result?.user) {
        // Convert Firebase user to Session format
        const userSession: Session = {
          user: {
            name: result.user.displayName || '',
            email: result.user.email || '',
            image: result.user.photoURL || '',
          },
        };
        setSession(userSession);
        navigate(callbackUrl || '/', { replace: true });
        return {};
      }
      return { error: 'Не удалось войти в систему' };
    } catch (error) {
      return { error: 'Произошла ошибка входа в систему' };
    } finally {
      const recaptchaContainer = document.getElementById('recaptcha-container');
      if (recaptchaContainer) {
        recaptchaContainer.remove();
      }
    }
  }, [navigate, setSession]);

  if (loading) {
    return <LinearProgress />;
  }

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <SignInPage
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        '& .MuiContainer-root': {
          maxWidth: '544px',
        },
        '& .MuiBox-root:first-child': {
          padding: '2.6rem',
        },
      }}
      providers={[
        { id: 'google', name: 'Google' },
        { id: 'credentials', name: 'Credentials' },
      ]}
      localeText={{
        providerSignInTitle: (provider: string) => `Войдите с помощью ${provider}`,
      }}
      signIn={signIn}
      slots={{
        title: () => <h2 style={{ marginBottom: 8 }}>Войти</h2>,
        subtitle: () => <></>,
        emailField: EmailField,
        passwordField: PasswordField,
        submitButton: SubmitButton,
        rememberMe: () => <></>,
      }}
      slotProps={{
        emailField: { autoFocus: true },
        passwordField: { autoComplete: 'off' },
        rememberMe: { hidden: true },
      }}
    />
  );
};