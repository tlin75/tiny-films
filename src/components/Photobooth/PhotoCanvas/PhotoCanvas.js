import styles from "./PhotoCanvas.module.css";

function PhotoCanvas({
  canvasRef,
  onMouseDown,
  onMouseMove,
  onMouseUp
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
    </div>
  )
}

export default PhotoCanvas