import { createBrowserRouter } from 'react-router';
import { App } from '../App.tsx';
import { SignIn as SignInPage } from '../pages/signin/index.tsx';
import { Layout } from '../components/layouts';
import { CustomPersonInfo } from '../components/person-info/custom-person-info.tsx';

export const ROUTER = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: 'person-info',
            Component: CustomPersonInfo,
          },
        ],
      },
      {
        path: '/sign-in',
        Component: SignInPage,
      },
    ],
  },
]);