// Import React/Redux
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { setUser, getUser } from '../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';

// Import Fontawesome
import { faUser, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Types
import { Info } from '../type/QuestType';

// Styles
import styles from '@/styles/index.module.scss';

// Components
import NavMap from '@/components/NavMap/NavMap';
import ModalInfo from '@/components/ModalInfo/ModalInfo';

export default function Home() {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const user: Info | undefined = useSelector((state: RootState) => getUser(state));

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    const fetchDataUser = () => {
      const data: any = localStorage.getItem('user');
      if (data) {
        const info: Info = JSON.parse(data);
        dispatch(setUser({ content: info }));
      } else setIsModalOpen(true);
    };
    fetchDataUser();
  }, []);

  // Handle onChange for infos inputs, receive well typed value and name of the variable to change (need to clear the type inside to avoid error ? GL futur me :D)
  const infoChange = (value: any, name: string) => {
    if (user) {
      dispatch(setUser({ content: { ...user, [name]: value } }));
      localStorage.setItem('user', JSON.stringify({ ...user, [name]: value }));
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
      </Head>
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.user}>
            <FontAwesomeIcon icon={faUser} size="3x" />
            {typeof user !== 'undefined' ? (
              <div className={styles.info}>
                <select
                  className={`${styles.clearInputCSS} ${styles.select}`}
                  value={user.faction}
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
                    value={user.level}
                    onChange={(e) => infoChange(Number(e.target.value), 'level')}
                  />
                </div>
              </div>
            ) : (
              <FontAwesomeIcon icon={faSpinner} size="3x" spin />
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
