// Type
type EyeProps = {
  show: boolean;
  onClick: () => void;
};

// Style
import styles from './Eye.module.css';

export default function Eye({ show, onClick }: EyeProps) {
  // React.Fragment obligatoire car sinon le code retournerait une expression conditionnelle (ternaire) qui ne serait pas une expression JSX valide.
  return (
    <div className={styles.mainDiv} onClick={onClick}>
      {show ? (
        <div className={styles.openedEye}>
          <img
            className={styles.eye}
            src="/assets/openEye.svg"
            alt="image d'un contour d'oeil ouvert"
          />
          <img className={styles.pupil} src="/assets/pupil.svg" alt="image d'une Pupille" />
        </div>
      ) : (
        <div className={styles.closedEye}>
          <img className={styles.eyelid} src="/assets/eyelid.svg" alt="image d'une paupière" />
          <img
            className={styles.eye}
            src="/assets/openEye.svg"
            alt="image d'un contour d'oeil ouvert"
          />
          <img className={styles.pupil} src="/assets/pupil.svg" alt="image d'une Pupille" />
        </div>
      )}
    </div>
  );
}
