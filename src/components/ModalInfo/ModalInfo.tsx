// Import React/Redux
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, setUser } from '../../redux/userSlice';
import { RootState } from '../../redux/store';

// Import Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faAngleRight, faTimes, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Styles
import styles from './ModalInfo.module.scss';

// Type
import { Info } from '../../type/QuestType';
interface ModalInfoProps {
  onClose: () => void;
}

export default function ModalInfo({ onClose }: Readonly<ModalInfoProps>) {
  const audioRefs = useRef<Array<HTMLAudioElement | null>>([]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const info: Info | undefined = useSelector((state: RootState) => getUser(state));

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const addInfo = () => {
    if (!info) {
      dispatch(setUser({ content: { faction: 'BEAR', level: 20, multiplayer: false } }));
      localStorage.setItem(
        'user',
        JSON.stringify({ faction: 'BEAR', level: 20, multiplayer: false }),
      );
    }
  };

  // Fonction pour jouer le son
  const playHoverSound = () => {
    const newAudioRef = document.createElement('audio');
    newAudioRef.src = '/sounds/hoverButton.wav';

    audioRefs.current.push(newAudioRef);
    newAudioRef.play();
  };

  const slides = [
    <div className={styles.slide} key={1}>
      <h3 className={styles.welcome}>Warning: This site is under construction</h3>
      <p className={styles.desc}>
        The site is finished, but the content is not completed yet. Many quests have not been coded
        or updated. And there are many more fonctionalities to come.
      </p>
    </div>,
    <div className={styles.slide} key={4}>
      <img className={styles.icon} src="/assets/iconQuest.svg" alt="Logo Quest EFT" />
      <h2 className={styles.welcome}>Welcome to Quest-eft</h2>
      <p className={styles.desc}>
        The site allow you to not be lost in the hundered of quests in Escape From Tarkov. <br />
        Follow these instructions to understand how to use the site.
      </p>
    </div>,
    <div className={styles.slide} key={2}>
      <img className={styles.screenshot} src="/assets/screenMap.jpg" alt="Interactive map of EFT" />
      <h3 className={styles.welcome}>
        Interactive maps with all the information you need for your quests
      </h3>
      <p className={styles.desc}>
        Select the map you&apos;d like to play, and add your quests using the menu on the left.
        After that, the quest objectives will be marked with colored icons on the map.
      </p>
    </div>,
    <div className={styles.slide} key={3}>
      <div className={styles.gears}>
        <FontAwesomeIcon icon={faCog} spin size="3x" />
        <FontAwesomeIcon icon={faCog} spin size="3x" spinReverse className={styles.MidleGear} />
        <FontAwesomeIcon icon={faCog} spin size="3x" className={styles.LastGear} />
      </div>
      <h3 className={styles.welcome}>Options</h3>
      <p className={styles.desc}>
        On the homepage, you can change your faction and your current level so that the search
        input will return only quests that you have unlocked instead of those that are locked. And if
        you want to play with a friend who has a different faction or level, you can click the
        multiplayer button to remove the restrictions.
      </p>
    </div>,
  ];

  return (
    <button
      className={styles.window}
      onClick={() => {
        addInfo();
        onClose();
      }}
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button className={styles.previous} onMouseEnter={playHoverSound} onClick={prevSlide}>
          <FontAwesomeIcon size="3x" icon={faAngleLeft} />
        </button>
        <div className={styles.center}>
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
        {slides.length === currentSlide + 1 ? (
          <button
            className={styles.close}
            onMouseEnter={playHoverSound}
            onClick={() => {
              addInfo();
              onClose();
            }}
          >
            <FontAwesomeIcon size="3x" className={styles.iconNavModal} icon={faTimes} />
          </button>
        ) : (
          <button className={styles.next} onMouseEnter={playHoverSound} onClick={nextSlide}>
            <FontAwesomeIcon size="3x" className={styles.iconNavModal} icon={faAngleRight} />
          </button>
        )}
      </div>
    </button>
  );
}
