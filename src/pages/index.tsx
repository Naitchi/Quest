import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Info } from '../type/QuestType';
import { setUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();

  const [info, setInfo] = useState<Info | undefined>();

  useEffect(() => {
    const fetchDataUser = () => {
      const data: any = localStorage.getItem('user');
      if (data) {
        const info: Info = JSON.parse(data);
        setInfo(info);
        dispatch(setUser({ content: info }));
      }
    };
    fetchDataUser();
  }, []);

  // Handle onChange for infos inputs, receive well typed value and name of the variable to change (need to clear the type inside to avoid error ? GL futur me :D)
  const infoChange = (value: any, name: string) => {
    if (info) {
      setInfo({ ...info, [name]: value });
      dispatch(setUser({ content: info }));
      localStorage.setItem('user', JSON.stringify({ ...info, [name]: value }));
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Quest-eft</title>
        <meta
          name="description"
          content=" Toujours perdu dans toutes les Quêtes de Escape From Tarkov ? Ce site est la solution !"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <script src="https://kit.fontawesome.com/bf63fdfe50.js"></script>
      </Head>
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.user}>
            <i className="fa-solid fa-user fa-3x"></i>
            {typeof info !== 'undefined' ? (
              <div className={styles.info}>
                <select
                  className={`${styles.clearInputCSS} ${styles.select}`}
                  value={info.faction}
                  onChange={(e) => infoChange(e.target.value, 'faction')}
                >
                  <option value="BEAR">BEAR</option>
                  <option value="USEC">USEC</option>
                </select>
                <div className={styles.level}>
                  <label className={styles.labelLvl} htmlFor="level">
                    Lvl:
                  </label>
                  <input
                    className={`${styles.clearInputCSS} ${styles.inputLevel}`}
                    id="level"
                    type="number"
                    value={info.level}
                    onChange={(e) => infoChange(Number(e.target.value), 'level')}
                  />
                </div>
              </div>
            ) : (
              <i className="fa-solid fa-spinner fa-spin"></i>
            )}
          </div>
        </div>
        {/** TODO faire de la map un composant à part entier  */}
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
        {/* TODO faire le onClick avec la modale */}
        <button className={styles.infosBulle}>?</button>
        <p className={styles.credit}>Site by naitchi</p>
      </div>
    </React.Fragment>
  );
}
