// Import React/Redux
import React, { useRef } from 'react';
import Link from 'next/link';

// Style
import styles from './NavMap.module.scss';

export default function NavMap() {
  const audioRefs = useRef<Array<HTMLAudioElement | null>>([]);
  // Fonction pour jouer le son
  const playHoverSound = () => {
    const newAudioRef = document.createElement('audio');
    newAudioRef.src = '/sounds/hoverButton.wav';

    audioRefs.current.push(newAudioRef);
    newAudioRef.play();
  };

  return (
    <div className={styles.map}>
      <Link
        onMouseEnter={playHoverSound}
        className={`${styles.lien} ${styles.customs}`}
        href="/customs"
      >
        CUSTOMS
      </Link>
      <Link
        onMouseEnter={playHoverSound}
        className={`${styles.lien} ${styles.factory}`}
        href="/factory"
      >
        FACTORY
      </Link>
      <Link
        onMouseEnter={playHoverSound}
        className={`${styles.lien} ${styles.woods}`}
        href="/woods"
      >
        WOODS
      </Link>
      <Link
        onMouseEnter={playHoverSound}
        className={`${styles.lien} ${styles.reserve}`}
        href="/reserve"
      >
        RESERVE
      </Link>
      <Link
        onMouseEnter={playHoverSound}
        className={`${styles.lien} ${styles.lighthouse}`}
        href="/lighthouse"
      >
        LIGHTHOUSE
      </Link>
      <Link
        onMouseEnter={playHoverSound}
        className={`${styles.lien} ${styles.shoreline}`}
        href="/shoreline"
      >
        SHORELINE
      </Link>
      <Link
        onMouseEnter={playHoverSound}
        className={`${styles.lien} ${styles.interchange}`}
        href="/interchange"
      >
        INTERCHANGE
      </Link>
      <Link
        onMouseEnter={playHoverSound}
        className={`${styles.lien} ${styles.streets}`}
        href="/streets"
      >
        STREETS OF <span className={styles.tarkov}>TARKOV</span>
      </Link>
      <Link onMouseEnter={playHoverSound} className={`${styles.lien} ${styles.lab}`} href="/lab">
        THE LAB
      </Link>
    </div>
  );
}
