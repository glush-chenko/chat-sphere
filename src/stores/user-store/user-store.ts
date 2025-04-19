import { makeAutoObservable, runInAction } from 'mobx';
import { ref, get } from 'firebase/database';
import { database } from '../../firebase/firebase-config.ts';
import { onAuthStateChanged } from '../../firebase/auth.ts';
import type { User } from 'firebase/auth';

export interface UserData {
  id: string;
  username: string;
  email: string;
  profile_picture: string;
  age?: number;
  status?: string;
  aboutMyself?: string;
}

class UserStore {
  userData: UserData | null = null;
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
    onAuthStateChanged((user: User | null) => {
      if (user) {
        void this.fetchUserData(user.uid);
      }
    });
  }

  async fetchUserData(uid: string) {
    try {
      const userRef = ref(database, 'users/' + uid);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        runInAction(() => {
          this.userData = { ...data };
        });
      } else {
        console.log('Нет данных для этого пользователя.');
      }
    } catch (error) {
      console.error('Ошибка при чтении данных:', error);
    } finally {
      this.loading = false;
    }
  }
}

const userStore = new UserStore();
export default userStore;