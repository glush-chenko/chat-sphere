import LinearProgress from '@mui/material/LinearProgress';
import { Outlet, Navigate, useLocation } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Account } from '@toolpad/core/Account';

import { useSession } from '../../Session-context.tsx';

function CustomAccount() {
  return (
    <Account
      slotProps={{
        preview: { slotProps: { avatarIconButton: { sx: { border: '0' } } } },
      }}
    />
  );
}

export const Layout = () => {
  const { session, loading } = useSession();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ width: '100%' }}>
        <LinearProgress />
      </div>
    );
  }

  if (!session) {
    // Add the `callbackUrl` search parameter
    const redirectTo = `/sign-in?callbackUrl=${encodeURIComponent(location.pathname)}`;

    return <Navigate to={redirectTo} replace />;
  }

  return (
    <DashboardLayout slots={{ toolbarAccount: CustomAccount }} hideNavigation>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
