import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/style.scss";
import FullLayout from "../src/layouts/FullLayout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Lund Exercise</title>
        <meta name="description" content="Record keeping for Lund family exercise goals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FullLayout>
        <Component {...pageProps} />
      </FullLayout>
    </>
  )
}

export default MyApp
