import Link from '@mui/material/Link';
import {  useLocalStorageState } from '@toolpad/core';
import { useCallback } from 'react';
import { BOOLEAN_CODEC } from '../../utils/booleanCodec.ts';

export const ForgotPasswordLink = () => {
  const [, setValue] = useLocalStorageState('open-forgot-password', null, {
    codec: BOOLEAN_CODEC,
  });

  const handleOpenForgotPassword = useCallback(() => {
    setValue(true);
  }, [setValue]);

  return (
    <Link variant="body2" onClick={handleOpenForgotPassword} sx={{ cursor: 'pointer' }}>
      Забыли пароль?
    </Link>
  );
};