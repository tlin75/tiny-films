import btnStyles from "../Buttons.module.css";
import styles from "./Welcome.module.css";
import { framePreview } from "../../../data/framePreview";

function Welcome({ onGetStarted }) {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <h1 className={styles.title}> ݁₊ ⊹ ✩ ݁ Photo Booth ⊹ ₊ ݁✩₊</h1>
        <p className={styles.subtitle}>
          Capture Your Moments And Memories
        </p>
      </div>

      <button className={`${btnStyles.btn} ${btnStyles.startBtn}`} onClick={onGetStarted}>
        Get Started
      </button>

      <div className={styles.previewSteps}>
        {framePreview.map((src, i) => (
          <div className={styles.previewCol} key={src} onClick={onGetStarted}>
            <img src={src} alt="frame preview" className={styles.previewImg} />
            <div className={styles.step}>
              <span className={styles.stepNum}>{i + 1}</span>
              <p>{["Select a frame", "Take four photos", "Decorate & download"][i]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Welcome;