import styles from "./Photobooth.module.css";
import btnStyles from "./Buttons.module.css";

export default function Header({ selectedFrame, mode, onBack }) {
  return (
    <div className={styles.headerBar}>
      {selectedFrame && (
        <button
          className={`${btnStyles.btn} ${styles.backBtn}`}
          onClick={onBack}
        >
          &larr; Back
        </button>
      )}

      <h1 className={styles.titleBar}>
        {!selectedFrame
          ? "₊✩‧₊˚ Select a frame౨ৎ ˚₊✩‧₊"
          : mode === "photo"
          ? "⋆｡‧˚ʚ Smile :)ɞ˚‧｡⋆"
          : ". ݁₊ ⊹ . ݁Let’s decorate . ⊹ ₊ ݁."}
      </h1>
    </div>
  );
}