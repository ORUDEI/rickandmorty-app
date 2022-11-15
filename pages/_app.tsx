import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '../src/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Rick And Morty</title>
          <meta name="description" content="Rick and Morty app" />
          <link rel="icon" href="/rickandmortydefault.jpg" />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
