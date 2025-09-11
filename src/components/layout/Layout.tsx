import Sidebar from './Sidebar';
import * as React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-950 dark:to-green-900">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;
