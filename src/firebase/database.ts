import { database } from './firebase-config.ts';
import { ref, set } from 'firebase/database';

export async function writeUserData(
  userId: string,
  name: string | null,
  email: string | null,
  imageUrl: string | null,
) {
  await set(ref(database, 'users/' + userId), {
    id: userId,
    username: name || '',
    email: email || '',
    profile_picture: imageUrl || '',
    status: "active",
    aboutMyself: "Hi, I'm spinning around ChatSphere!",
  });
}
