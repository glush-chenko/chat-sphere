import { PersonInfoCard } from './person-info-card';
import Paper from '@mui/material/Paper';
import userStore, { UserData } from '../../stores/user-store/user-store.ts';
import { observer } from 'mobx-react-lite';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

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
  // {
  //   field: 'status',
  //   headerName: 'Статус',
  // },
  {
    field: 'aboutMyself',
    headerName: 'О себе',
  },
];

export const CustomPersonInfo = observer(() => {
  if (userStore.loading) {
    return (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={371}
            height={95}
          />
        ))}
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
        justifyContent: {
          xs: 'center',
          lg: "space-between"
        },
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
