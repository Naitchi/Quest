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
      <img src="/assets/iconQuest.svg" alt="Logo Quest EFT" />
      <h2>
        Bienvenue sur Quest-eft
        <br />
        Le site qui te vas te permettre de te retrouver dans la jungle de quête de Escape From
        Tarkov
      </h2>
      <p>Suis ces quelques indiquations pour avoir de quoi utilisé le site</p>
    </div>,
    <div className={styles.slide} key={2}>
      <h3>Des maps intéractives avec toutes les infos de tes quêtes.</h3>
      <p>
        Sélectionne la map que tu veux jouer, puis ajoute les quêtes que tu as. Ensuite les
        objectifs des quêtes seront indiqué via des icones coloré sur la map!
      </p>
    </div>,
    <div className={styles.slide} key={3}>
      <h3>Les options ma passion</h3>
      <p>
        Sur la page d'acceuil tu peux changer ta faction, ton niveau actuel pour que les quêtes
        proposé soit adapté à ces facteurs. Et pas de panique, si tu veux regrouper tes quetes avec
        celles de tes amis, tu peux activé le mode multi-joueurs.
      </p>
    </div>,
    <div className={styles.slide} key={4}>
      <h3>Tout ça 100% Gratuit</h3>
      <p>Juste un site pour aider les joueurs de EFT à s'y retrouver dans les quêtes.</p>
    </div>,
  ];

  return (
    <div className={styles.window}>
      <div className={styles.container}>
        <button className={styles.previous} onClick={prevSlide}>
          &lt;
        </button>
        <div className={styles.center}>
          <button className={styles.closeButton} onClick={onClose}>
            Fermer
          </button>
          <div className={styles.slider}>{slides[currentSlide]}</div>
          <div className={styles.bullets}>
            {slides.map((_, index) => (
              <button key={index} onClick={() => setCurrentSlide(index)}>
                {index === currentSlide ? '●' : '○'}
              </button>
            ))}
          </div>
        </div>
        <button className={styles.next} onClick={nextSlide}>
          &gt;
        </button>
      </div>
    </div>
  );
}
