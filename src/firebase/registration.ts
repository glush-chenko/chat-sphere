import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { firebaseAuth } from './firebase-config.ts';
import { writeUserData } from './database.ts';
import { AuthResponse } from '@toolpad/core';

export const registerUser = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const user = userCredential.user;

    await sendEmailVerification(user);
    await writeUserData(user.uid, user.displayName, user.email, user.photoURL);

    return {
      success: 'Регистрация успешна!',
      error: '',
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'Firebase: Error (auth/email-already-in-use).') {
      return { error: 'Такой email уже используется.' };
    } else {
      throw error;
    }
  }
};
