import { type FunctionComponent } from 'react';
import NavigationBar from './NavigationBar';
import { Outlet } from 'react-router';
import Flyout from './Flyout';

const Layout: FunctionComponent = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Flyout />
    </>
  );
};

export default Layout;
