import Head from 'next/head';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
