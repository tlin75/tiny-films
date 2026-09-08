import styles from './StickerPicker.module.css';
import btnStyles from '../Buttons.module.css';

function StickerPicker({
  mode,
  stickerOptions,
  onAddSticker,
  onDownload
}) {
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        {stickerOptions.map((src) => (
          <img
            key={src}
            src={src}
            alt="sticker"
            onClick={() => onAddSticker(src)}
            className={styles.sticker}
          />
        ))}
      </div>
      {mode === "decorate" && (
        <div className={styles.downloadWrap}>
          <button className={btnStyles.btn} onClick={onDownload}>
            Download Your Film
          </button>
        </div>
      )}
    </div>
    
  );
}

export default StickerPicker