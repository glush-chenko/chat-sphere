import { PageHeaderToolbar, PageHeader } from '@toolpad/core/PageContainer';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import userStore from '../../stores/user-store/user-store.ts';
import { firebaseAuth } from '../../firebase/firebase-config.ts';
import { observer } from 'mobx-react-lite';

export const PageHeaderComponent = observer(() => {
  return (
    <PageHeader
      title="Персональная информация"
      breadcrumbs={[]}
      slots={{
        toolbar: () => (
          <PageHeaderToolbar>
            {userStore.userData && (
              <p>Текущий статус: {userStore.userData.status}</p>
            )}
            <Button
              startIcon={<EditIcon />}
              color="inherit"
              size="small"
              disabled={!firebaseAuth.currentUser?.emailVerified}
            >
              Редактировать
            </Button>
          </PageHeaderToolbar>
        ),
      }}
    />
  );
});