import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Quest-eft</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
      </Head>
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.user}>
            {/* TODO faire l'icone user via fontawesome */}
            {/* TODO afficher le niveau de l'utilisateur dans un input pour qu'il puis changer quand il veut */}
            {/* TODO afficher la faction */}
          </div>
        </div>
        <div className={styles.map}>
          <Link className={styles.customs} href="/customs"></Link>
          <Link className={styles.factory} href="/factory"></Link>
          <Link className={styles.woods} href="/woods"></Link>
          <Link className={styles.reserve} href="/reserve"></Link>
          <Link className={styles.lighthouse} href="/lighthouse"></Link>
          <Link className={styles.shoreline} href="/shoreline"></Link>
          <Link className={styles.interchange} href="/interchange"></Link>
          <Link className={styles.streets} href="/streets"></Link>
        </div>
      </div>
    </React.Fragment>
  );
}
