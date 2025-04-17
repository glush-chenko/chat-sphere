import Link from '@mui/material/Link';
import { useLocalStorageState } from '@toolpad/core';
import { useCallback } from 'react';
import { BOOLEAN_CODEC } from '../../utils/booleanCodec.ts';

export const SignUpLink = () => {
  const [, setValue] = useLocalStorageState('open-signup', null, {
    codec: BOOLEAN_CODEC,
  });

  const handleOpenSignup = useCallback(() => {
    setValue(true);
  }, [setValue]);

  return (
    <Link variant="body2" onClick={handleOpenSignup} sx={{ cursor: 'pointer' }}>
      Регистрация
    </Link>
  );
};