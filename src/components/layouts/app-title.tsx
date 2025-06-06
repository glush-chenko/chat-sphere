import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import logo from "../../assets/main-img.png"
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '../../firebase/auth.ts';
import type { User } from 'firebase/auth';

export const AppTitle = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user: User | null) => {
      if (user && !user.emailVerified) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <img src={logo} alt="logo" width="40px" height="40px"/>
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, lineHeight: 1, fontSize: '1.25rem', color: "primary.main" }}
      >
        Chat Sphere
      </Typography>
      {showAlert && (
        <Alert severity="warning">
          Подтвердите электронную почту, чтобы изменять профиль
        </Alert>
      )}
    </Stack>
  );
};