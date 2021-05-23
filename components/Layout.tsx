import Head from 'next/head';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>petermekhaeil.com</title>
      </Head>

      <Header />
      <main>{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
