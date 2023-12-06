// Import React/Redux
import React from 'react';
import Link from 'next/link';

// Style
import styles from './NavMap.module.css';

export default function NavMap() {
  return (
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
  );
}
