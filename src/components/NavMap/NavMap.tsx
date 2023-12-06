// Import React/Redux
import React from 'react';
import Link from 'next/link';

// Style
import styles from './NavMap.module.css';

export default function NavMap() {
  return (
    <div className={styles.map}>
      <Link className={`${styles.lien} ${styles.customs}`} href="/customs">
        CUSTOMS
      </Link>
      <Link className={`${styles.lien} ${styles.factory}`} href="/factory">
        FACTORY
      </Link>
      <Link className={`${styles.lien} ${styles.woods}`} href="/woods">
        WOODS
      </Link>
      <Link className={`${styles.lien} ${styles.reserve}`} href="/reserve">
        RESERVE
      </Link>
      <Link className={`${styles.lien} ${styles.lighthouse}`} href="/lighthouse">
        LIGHTHOUSE
      </Link>
      <Link className={`${styles.lien} ${styles.shoreline}`} href="/shoreline">
        SHORELINE
      </Link>
      <Link className={`${styles.lien} ${styles.interchange}`} href="/interchange">
        INTERCHANGE
      </Link>
      <Link className={`${styles.lien} ${styles.streets}`} href="/streets">
        STREETS OF <span className={styles.tarkov}>TARKOV</span>
      </Link>
      <Link className={`${styles.lien} ${styles.lab}`} href="/lab">
        THE LAB
      </Link>
    </div>
  );
}
