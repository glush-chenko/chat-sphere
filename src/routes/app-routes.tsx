import { createBrowserRouter } from 'react-router';
import { App } from '../App.tsx';
import { SignIn as SignInPage } from '../pages/signin/index.tsx';
import { Layout } from '../components/layouts';

export const ROUTER = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        // children: [
        //   {
        //     path: '',
        //     Component: ,
        //   },
        // ],
      },
      {
        path: '/sign-in',
        Component: SignInPage,
      },
    ],
  },
]);