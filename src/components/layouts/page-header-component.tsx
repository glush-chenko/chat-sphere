import { PageHeaderToolbar, PageHeader } from '@toolpad/core/PageContainer';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import userStore from '../../stores/user-store/user-store.ts';
import { firebaseAuth } from '../../firebase/firebase-config.ts';
import { observer } from 'mobx-react-lite';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const PageHeaderComponent = observer(() => {
  return (
    <PageHeader
      title="Персональная информация"
      breadcrumbs={[]}
      slots={{
        toolbar: () => (
          <PageHeaderToolbar>
            <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {userStore.userData && (
                <Box sx={{ display: 'flex', gap: '0.2rem' }}>
                  <Typography variant="body1">Текущий статус:</Typography>
                  <Typography variant="body1" sx={{ color: 'primary.main' }}>{userStore.userData.status}</Typography>
                </Box>
              )}
              <Button
                startIcon={<EditIcon />}
                color="inherit"
                size="small"
                disabled={!firebaseAuth.currentUser?.emailVerified}
              >
                Редактировать
              </Button>
            </Box>
          </PageHeaderToolbar>
        ),
      }}
    />
  );
});