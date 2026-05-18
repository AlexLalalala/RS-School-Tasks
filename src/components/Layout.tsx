import { type FunctionComponent } from 'react';
import NavigationBar from './NavigationBar';
import { Outlet } from 'react-router';

const Layout: FunctionComponent = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};

export default Layout;
