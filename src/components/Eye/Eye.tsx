// Type
type EyeProps = {
  show: boolean;
  onClick: () => void;
};

// Style
import styles from './Eye.module.scss';

export default function Eye({ show, onClick }: Readonly<EyeProps>) {
  return (
    <button className={styles.mainDiv} onClick={onClick}>
      {show ? (
        <div className={styles.openedEye}>
          <img className={styles.eye} src="/assets/openEye.svg" alt="Image of an open eye" />
          <div className={styles.hide}>
            <img className={styles.pupil} src="/assets/pupil.svg" alt="Image of a pupil" />
          </div>
        </div>
      ) : (
        <div className={styles.closedEye}>
          <img className={styles.eyelid} src="/assets/eyelid.svg" alt="Image of an eyelid" />
          <div className={styles.hide}>
            <img className={styles.eye} src="/assets/openEye.svg" alt="Image of an open eye" />
            <img className={styles.pupil} src="/assets/pupil.svg" alt="Image of a pupil" />
          </div>
        </div>
      )}
    </button>
  );
}
