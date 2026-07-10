import styles from "./Photobooth.module.css";
import btnStyles from "./Buttons.module.css";

function Header({ selectedFrame, mode, onBack }) {
  return (
    <div className={styles.headerAll}>
      {selectedFrame && (
        <button className={`${btnStyles.btn} ${styles.backBtn}`} onClick={onBack}>
          &larr; Back
        </button>
      )}
      <div className={styles.headerBar}>
        <h1 className={styles.titleBar}>
          {!selectedFrame
            ? "₊✩‧₊˚ Select a frame ౨ৎ ˚₊✩‧₊"
            : mode === "photo"
            ? "⋆｡‧˚ʚ Smile :) ɞ˚‧｡⋆"
            : ". ݁₊ ⊹ . ݁Let’s decorate . ⊹ ₊ ݁."}
        </h1>
      </div>
    </div>
  );
}

export default Header