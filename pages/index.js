import Head from "next/head";
import Sidebar from "../Components/Sidebar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Whats App 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar/>
    </div>
  );
}
