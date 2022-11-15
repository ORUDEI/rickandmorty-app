import Head from 'next/head';
import Layout from '../src/components/Layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Layout>
        <Head>
          <title>Rick And Morty - Home</title>
        </Head>
      </Layout>
    </div>
  );
}
