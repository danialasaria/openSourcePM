import Head from 'next/head';
import { COMPANY_NAME } from 'constants';
// import Footer from './Footer';
import styles from './Layout.module.css';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <title>{COMPANY_NAME}</title>
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
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/34591059/197075323-359e1872-ebb5-4c4a-b909-939f4ab1ecad.png"
        />
      </Head>
      <Nav />
      <main className={styles.main}>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
