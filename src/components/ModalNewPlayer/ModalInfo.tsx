// Import React/Redux
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, setUser } from '../../redux/userSlice';
import { RootState } from '../../redux/store';

// Styles
import styles from './ModalInfo.module.css';

// Type
import { Info } from '../../type/QuestType';
interface ModalInfoProps {
  onClose: () => void; // Add this line
}

export default function ModalInfo({ onClose }: Readonly<ModalInfoProps>) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [Info, setInfo] = useState();
  const dispatch = useDispatch();
  const info: Info | undefined = useSelector((state: RootState) => getUser(state));

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const infoChange = (value: any, name: string) => {
    if (info) {
      dispatch(setUser({ content: { ...info, [name]: value } }));
      localStorage.setItem('user', JSON.stringify({ ...info, [name]: value }));
    }
  };

  const slides = [
    <div className={styles.slide} key={1}>
      <img className={styles.icon} src="/assets/iconQuest.svg" alt="Logo Quest EFT" />
      <h2 className={styles.welcome}>Bienvenue sur Quest-eft</h2>
      <p className={styles.desc}>
        Le site qui te vas te permettre de te retrouver dans la jungle de quête de Escape From
        Tarkov. <br /> Suis ces quelques indiquations pour avoir de quoi utilisé le site
      </p>
    </div>,
    <div className={styles.slide} key={2}>
      <img
        className={styles.screenshot}
        src="/assets/screenMap.jpg"
        alt="carte interractive de EFT"
      />
      <h3 className={styles.welcome}>Des maps intéractives avec toutes les infos de tes quêtes.</h3>
      <p className={styles.desc}>
        Sélectionne la map que tu veux jouer, puis ajoute les quêtes que tu as. Ensuite les
        objectifs des quêtes seront indiqué via des icones coloré sur la map!
      </p>
    </div>,
    <div className={styles.slide} key={3}>
      <div className={styles.gears}>
        <i className="fa-solid fa-gear fa-3x fa-spin"></i>
        <i className="fa-solid fa-gear fa-3x fa-spin fa-spin-reverse"></i>
        <i className="fa-solid fa-gear fa-3x fa-spin"></i>
      </div>
      <h3 className={styles.welcome}>Les options ma passion</h3>
      <p className={styles.desc}>
        Sur la page d'acceuil tu peux changer ta faction, ton niveau actuel pour que les quêtes
        proposé soit adapté à ces facteurs. Et pas de panique, si tu veux regrouper tes quetes avec
        celles de tes amis, tu peux activé le mode multi-joueurs.
      </p>
    </div>,
    <div className={styles.slide} key={4}>
      <h3 className={styles.welcome}>Tout ça 100% Gratuit</h3>
      <p className={styles.desc}>
        Juste un site pour aider les joueurs de EFT à s'y retrouver dans les quêtes.
      </p>
    </div>,
  ];

  return (
    <div className={styles.window}>
      <div className={styles.container}>
        <button className={styles.previous} onClick={prevSlide}>
          <i className="fa-solid fa-2x fa-angle-left"></i>
        </button>
        <div className={styles.center}>
          <button className={styles.closeButton} onClick={onClose}>
            Fermer
          </button>
          <div className={styles.slider}>{slides[currentSlide]}</div>
          <div className={styles.bullets}>
            {/** TODO faires des transitions css */}
            {slides.map((_, index) => (
              <button className={styles.bullet} key={index} onClick={() => setCurrentSlide(index)}>
                {index === currentSlide ? '●' : '○'}
              </button>
            ))}
          </div>
        </div>
        {slides.length - 1 === currentSlide ? (
          <button className={`${styles.next} ${styles.close}`} onClick={onClose}>
            X
          </button>
        ) : (
          <button className={styles.next} onClick={nextSlide}>
            <i className="fa-solid fa-2x fa-angle-right"></i>
          </button>
        )}
        {/* TODO Remplacé par un bouton fermer quand c'est la derniere slide*/}
      </div>
    </div>
  );
}
