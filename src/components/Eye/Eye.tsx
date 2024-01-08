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
          <img
            className={styles.eye}
            src="/assets/openEye.svg"
            alt="Image d'un contour d'oeil ouvert"
          />
          <div className={styles.hide}>
            <img className={styles.pupil} src="/assets/pupil.svg" alt="Image d'une pupille" />
          </div>
        </div>
      ) : (
        <div className={styles.closedEye}>
          <img className={styles.eyelid} src="/assets/eyelid.svg" alt="Image d'une paupière" />
          <div className={styles.hide}>
            <img
              className={styles.eye}
              src="/assets/openEye.svg"
              alt="image d'un contour d'oeil ouvert"
            />
            <img className={styles.pupil} src="/assets/pupil.svg" alt="Image d'une pupille" />
          </div>
        </div>
      )}
    </button>
  );
}
