import btnStyles from "../Buttons.module.css";
import styles from "./Welcome.module.css";

function Welcome({ onGetStarted }) {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>₊‧꒰ა ☆ Photo Booth ☆ ໒꒱‧₊</h1>
      <p className={styles.subtitle}>
        ˖°✧ Take four photos, select a frame, and decorate with stickers ✧˖°
      </p>
      <button className={btnStyles.btn} onClick={onGetStarted}>
        Get Started
      </button>
    </div>
  );
}

export default Welcome
