import Head from 'next/head';
import { Login } from '@/page-components/Auth';
import Script from 'next/script';

const LoginPage = () => {
  return (
    <>
      <div>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-55S511V7X2"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-55S511V7X2');
        `}
        </Script>
      </div>
      <Head>
        <title>Login</title>
      </Head>
      <Login />
    </>
  );
};

export default LoginPage;
