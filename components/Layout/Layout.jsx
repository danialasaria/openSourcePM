import Head from 'next/head';
// import Footer from './Footer';
import styles from './Layout.module.css';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Open Source PM</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="An app to raise the next generation of PMs"
        />
        <meta
          property="og:title"
          content="An app to raise the next generation of Pms"
        />
        <meta
          property="og:description"
          content="An app to raise the next generation of PMs"
        />
        <meta property="og:image" content="public/linkPreview.png" />
      </Head>
      <Nav />
      <main className={styles.main}>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
