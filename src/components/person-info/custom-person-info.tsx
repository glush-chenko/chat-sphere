import { PersonInfoCard } from './person-info-card';
import Paper from '@mui/material/Paper';
import userStore, { UserData } from '../../stores/user-store/user-store.ts';
import { observer } from 'mobx-react-lite';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const FIELDS:
  Array<{ field: keyof UserData; headerName: string; type?: string }>
  = [
  {
    field: 'username',
    headerName: 'Username',
  },
  {
    field: 'email',
    headerName: 'Email',
  },
  {
    field: 'age',
    headerName: 'Возраст',
    type: 'number',
  },
  {
    field: 'status',
    headerName: 'Статус',
  },
  {
    field: 'aboutMyself',
    headerName: 'О себе',
  },
];

export const CustomPersonInfo = observer(() => {
  if (userStore.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      {FIELDS.map((field, index) => (
        <PersonInfoCard
          key={`field ${index}`}
          headers={field.headerName}
          keys={field.field}
        />
      ))}
    </Paper>
  );
});
