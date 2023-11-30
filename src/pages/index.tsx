import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import React, { useState } from 'react';

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Quest-eft</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
      </Head>
      <body>
        <div className={styles.left}>
          <div className={styles.user}>
            {/* TODO faire l'icone user via fontawesome */}
            {/* TODO afficher le niveau de l'utilisateur dans un input pour qu'il puis changer quand il veut */}
            {/* TODO afficher la faction */}
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.hide}>
            <a className={styles.customs} href="/customs"></a>
            <a className={styles.factory} href="/factory"></a>
            <a className={styles.woods} href="/woods"></a>
            <a className={styles.reserve} href="/reserve"></a>
            <a className={styles.lighthouse} href="/lighthouse"></a>
            <a className={styles.shoreline} href="/shoreline"></a>
            <a className={styles.interchange} href="/interchange"></a>
            <a className={styles.streets} href="/streets"></a>
          </div>
          <img src="/assets/TarkovMap.webp" alt="carte de la totalité de Tarkov" />
        </div>
      </body>
    </React.Fragment>
  );
}
