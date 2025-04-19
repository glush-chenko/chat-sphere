import {
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { firebaseAuth } from './firebase-config.ts';
import type { User } from 'firebase/auth';
import { writeUserData } from './database.ts';

const googleProvider = new GoogleAuthProvider();

// Sign in with Google functionality
export const signInWithGoogle = async () => {
  try {
    return setPersistence(firebaseAuth, browserSessionPersistence).then(async () => {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const user = result.user;

      // Add the user to the database
      await writeUserData(user.uid, user.displayName, user.email, user.photoURL);

      return {
        success: true,
        user: result.user,
        error: null,
      };
    });
  } catch (error) {
    if (error instanceof Error) {
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
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return firebaseAuth.onAuthStateChanged(callback);
};