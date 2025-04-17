import {
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { firebaseAuth } from './firebase-config.ts';
import { AuthResponse } from '@toolpad/core';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

// Sign in with Google functionality
export const signInWithGoogle = async () => {
  try {
    return setPersistence(firebaseAuth, browserSessionPersistence).then(async () => {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      return {
        success: true,
        user: result.user,
        error: null,
      };
    });
  } catch (error) {
    if (error instanceof  Error) {
      return {
        success: false,
        user: null,
        error: error.message,
      };
    }
  }
};

// Sign in with email and password
export async function signInWithCredentials(email: string, password: string) {
  try {
    return setPersistence(firebaseAuth, browserSessionPersistence).then(async () => {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return {
        success: true,
        user: userCredential.user,
        error: null,
      };
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        user: null,
        error: error.message || 'Failed to sign in with email/password',
      };
    }
  }
}

// Sign out functionality
export const firebaseSignOut = async () => {
  try {
    await signOut(firebaseAuth);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
};

// Auth state observer
export const onAuthStateChanged = (callback: (user: any) => void) => {
  return firebaseAuth.onAuthStateChanged(callback);
};

export const registerUser = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const user = userCredential.user;

    await sendEmailVerification(user);

    return {
      success: 'Регистрация успешна!',
      error: '',
    };
  } catch (error) {
    if (error instanceof Error && error.message === "Firebase: Error (auth/email-already-in-use).") {
      return { error: 'Такой email уже используется.' };
    } else {
      throw error;
    }
  }
};
