import Webcam from "react-webcam";
import btnStyles from "../Buttons.module.css";
import styles from "./PhotoCapture.module.css";

function PhotoCapture({
  webcamRef,
  videoConstraints,
  countdown,
  canTakePhoto,
  photoCount,
  onCapture,
  onUpload,
  onRedo,
}) {
  return (
    <div>
      {/* Implmeent webcam specifications */}
      <div className={styles.webcamWrap}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
          mirrored
          className={styles.webcam}
        />

        {/* countdown overlay */}
        {countdown != null && (
          <div className={styles.countdownOverlay}>{countdown}</div>
        )}

        {/* Capture photo buttons */}
        <div className={styles.buttonRow}>
          {canTakePhoto && (
            <>
              <button className={btnStyles.btn} onClick={onCapture}>
                Take Photo
              </button>
              <label className={btnStyles.btn} style={{ cursor: "pointer" }}>
                Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={onUpload}
                  style={{ display: "none" }}
                />
              </label>
            </>
          )}

          {photoCount > 0 && (
            <button className={btnStyles.redoBtn} onClick={onRedo}>
              ⟳ Redo
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PhotoCapture