import { DataModel, DataSource, DataSourceCache, Show } from '@toolpad/core/Crud';
import { ref, get } from 'firebase/database';
import { database, firebaseAuth } from '../../firebase/firebase-config.ts';

interface UserData extends DataModel {
  id: string;
  username: string;
  email: string;
  profile_picture: string;
  age?: number;
  status?: string;
  aboutMyself?: string;
}

export const personDataSource: DataSource<UserData> &
  Required<Pick<DataSource<UserData>, 'getOne'>> = {
  fields: [
    {
      field: 'username',
      headerName: 'username',
    },
    {
      field: 'email',
      headerName: 'email',
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
    },
    {
      field: 'status',
      headerName: 'Status',
    },
    {
      field: 'aboutMyself',
      headerName: 'About myself',
    },
  ],
  getOne: async (personId) => {
    const userRef = ref(database, 'users/' + personId);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('Нет данных для этого пользователя.');
      return {
        id: '',
        username: '',
        email: '',
        profile_picture: '',
      };
    }
  },
  // updateOne: async (personId, data) => {
  //
  // },
  // deleteOne: async (personId) => {
  //
  // },
  // validate: (formValues) => {
  //   let issues: { message: string; path: [keyof UserData] }[] = [];
  //
  //   if (!formValues.username) {
  //     issues = [
  //       ...issues,
  //       { message: 'Username is required', path: ['username'] },
  //     ];
  //   }
  //   if (!formValues.email) {
  //     issues = [
  //       ...issues,
  //       { message: 'Email is required', path: ['email'] },
  //     ];
  //   }
  //   if (!formValues.age) {
  //     issues = [...issues, { message: 'Age is required', path: ['age'] }];
  //   } else if (formValues.age <= 0) {
  //     issues = [
  //       ...issues,
  //       { message: 'Must be at least 1 year old', path: ['age'] },
  //     ];
  //   }
  //   if (!formValues.status) {
  //     issues = [...issues, { message: 'Status is required', path: ['status'] }];
  //   }
  //
  //   return { issues };
  // },
};

const peopleCache = new DataSourceCache();

export const PersonInfo = () => {

  return (
    <>
      <Show<UserData>
        id={firebaseAuth.currentUser?.uid || ''}
        dataSource={personDataSource}
        dataSourceCache={peopleCache}
        // onEditClick={handleEditClick}
        // onDelete={handleDelete}
      />
    </>
  );
};