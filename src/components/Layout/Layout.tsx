import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-black ">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
