import LinearProgress from '@mui/material/LinearProgress';
import { Outlet, Navigate, useLocation } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Account } from '@toolpad/core/Account';

import { useSession } from '../../context/session-context.tsx';
import { AppTitle } from './app-title.tsx';
import { useEffect } from 'react';
import { firebaseAuth } from '../../firebase/firebase-config.ts';
import { PageHeaderComponent } from './page-header-component.tsx';

function CustomAccount() {
  return (
    <Account
      localeText={{
        accountSignOutLabel: 'Выйти',
      }}
      slotProps={{
        preview: {
          slotProps: {
            avatarIconButton: { sx: { border: '0' } },
          },
        },
      }}
    />
  );
}

export const Layout = () => {
  const { session, loading } = useSession();
  const location = useLocation();
  const path = location.pathname;

  const isAnonymous = firebaseAuth.currentUser?.isAnonymous;

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        const element = document.querySelector('[aria-label="Expand navigation menu"]');
        if (element) {
          element.remove();
          observer.disconnect();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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

  if (path === '/person-info' && isAnonymous) {
    return <Navigate to="/" replace />;
  }

  return (
    <DashboardLayout
      slots={{
        toolbarAccount: CustomAccount,
        appTitle: AppTitle,
      }}
      defaultSidebarCollapsed
      sx={{
        '& .MuiToolbar-root': {
          '& .MuiStack-root:first-child': {
            flexGrow: 1,
            '& .MuiPaper-root': {
              flexGrow: 1,
              justifyContent: 'center',
            },
          },
        },
        '& .MuiList-root': {
          '& .MuiListItem-root ': {
            '& .MuiButtonBase-root': {
              pointerEvents: isAnonymous ? 'none' : 'auto',
            },
          },
        },
      }}
    >
      <PageContainer sx={{ alignItems: 'center' }} slots={{ header: PageHeaderComponent }}>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
};
