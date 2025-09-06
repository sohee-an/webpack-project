import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }: { children?: ReactNode }) {
  return (
    <div className="h-dvh min-w-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
