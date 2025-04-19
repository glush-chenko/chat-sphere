import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import './App.css';
import { Outlet } from 'react-router';
import SessionContext, { type Session } from './context/session-context.tsx';
import { useEffect, useMemo, useState } from 'react';
import type { Authentication } from '@toolpad/core/AppProvider';
import type { User } from 'firebase/auth';
import { firebaseSignOut, onAuthStateChanged, signInWithGoogle } from './firebase/auth.ts';
import logo from './assets/main-img.png';
import { NAVIGATION } from './routes/navigation.tsx';
// import {ruRU} from '@mui/material/locale';

const BRANDING = {
  logo: <img src={logo} alt="logo" width="40px" height="40px" />,
  title: 'Chat Sphere',
};

const AUTHENTICATION: Authentication = {
  signIn: signInWithGoogle,
  signOut: firebaseSignOut,
};

export const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Returns an `unsubscribe` function to be called during teardown
    const unsubscribe = onAuthStateChanged((user: User | null) => {
      if (user) {
        setSession({
          user: {
            name: user.displayName || '',
            email: user.email || '',
            image: user.photoURL || '',
          },
        });
      } else {
        setSession(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sessionContextValue = useMemo(
    () => ({
      session,
      setSession,
      loading,
    }),
    [session, loading],
  );

  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
      branding={BRANDING}
      session={session}
      authentication={AUTHENTICATION}
    >
      <SessionContext.Provider value={sessionContextValue}>
        <Outlet />
      </SessionContext.Provider>
    </ReactRouterAppProvider>
  );
};
