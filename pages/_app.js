import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import Head from "next/head";
import Header from "../components/Header";
import { NotificationProvider } from "web3uikit";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>NFT Marketplace</title>
        <meta name="description" content="NFT Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider initializeOnMount={false}>
        <NotificationProvider>
          <Header />
          <Component {...pageProps} />
        </NotificationProvider>
      </MoralisProvider>
    </div>
  );
}

export default MyApp;
