// Import React/Redux
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { setUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

// Import Fontawesome
import { faUser, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Types
import { Info } from '../type/QuestType';

// Styles
import styles from '@/styles/Home.module.css';

// Components
import NavMap from '@/components/NavMap/NavMap';
import ModalInfo from '@/components/ModalNewPlayer/ModalInfo';

export default function Home() {
  const dispatch = useDispatch();

  const [info, setInfo] = useState<Info | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
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
            <FontAwesomeIcon icon={faUser} className="fa-3x" />
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
              <FontAwesomeIcon icon={faSpinner} spin />
            )}
          </div>
        </div>
        <NavMap />
        <button onClick={toggleModal} className={styles.infosBulle}>
          ?
        </button>
        {isModalOpen && <ModalInfo onClose={toggleModal} />}
        <p className={styles.credit}>
          Site 100% free by{' '}
          <a className={styles.link} href="https://github.com/Naitchi">
            Naitchi
          </a>{' '}
          (looking for work)
        </p>
      </div>
    </React.Fragment>
  );
}
