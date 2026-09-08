import styles from "./Photobooth.module.css";
import btnStyles from "./Buttons.module.css";

function Header({ selectedFrame, mode, onBack }) {
  return (
    <div className={styles.headerAll}>
      <button className={`${btnStyles.btn} ${styles.backBtn}`} onClick={onBack}>
        &larr; Back
      </button>
      <h1 className={styles.titleBar}>
        {!selectedFrame
          ? "₊✩‧₊˚ Select a frame ˚₊✩‧₊"
          : mode === "photo"
          ? "⋆｡‧˚ Smile :D ˚‧｡⋆"
          : ". ݁₊ ⊹ . Let’s decorate  ⊹ ₊ ݁."}
      </h1>
    </div>
  );
}

export default Header