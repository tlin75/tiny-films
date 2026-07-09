import styles from './StickerPicker.module.css';

function StickerPicker({
  stickerOptions,
  onAddSticker,
}) {
  return (
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
  );
}

export default StickerPicker