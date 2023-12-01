import Script from 'next/script';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import React, { useState } from 'react';
import Link from 'next/link';
import { Info } from '../type/QuestType';

export default function Home() {
  const [info, setInfo] = useState<Info | undefined>({
    faction: 'BEAR',
    level: 13,
  });

  const infoChange = (e: any) => {
    if (info) setInfo({ faction: info.faction, level: Number(e.target.value) });
  };

  return (
    <React.Fragment>
      <Head>
        <title>Quest-eft</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <Script src="https://kit.fontawesome.com/bf63fdfe50.js"></Script>
      </Head>
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.user}>
            <i className="fa-solid fa-user"></i>
            {typeof info !== 'undefined' ? (
              <div className={styles.info}>
                <p>{info.faction}</p>
                <label htmlFor="level">Lvl:</label>
                <input
                  id="level"
                  type="number"
                  value={info.level}
                  onChange={(e) => infoChange(e)}
                />
              </div>
            ) : (
              <i className="fa-solid fa-spinner fa-spin"></i>
            )}
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
        <div className={styles.infosBulle}>
          <p className={styles.infos}>?</p>
        </div>
        <p className={styles.credit}>Site by naitchi</p>
      </div>
    </React.Fragment>
  );
}
