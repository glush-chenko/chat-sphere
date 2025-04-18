import { Codec } from '@toolpad/core';

export const BOOLEAN_CODEC: Codec<boolean> = {
  parse: (value) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
    return false;
  },
  stringify: (value) => {
    return value ? 'true' : 'false';
  },
};