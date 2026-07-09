import btnStyles from "../Buttons.module.css";
import styles from "./PhotoCanvas.module.css";

function PhotoCanvas({
  canvasRef,
  mode,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onDownload
}) {
  return (
    <div>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />

      {mode === "decorate" && (
        <div className={styles.downloadWrap}>
          <button className={btnStyles.btn} onClick={onDownload}>
            Download
          </button>
        </div>
      )}
    </div>
  )
}

export default PhotoCanvas