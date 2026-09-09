import { useState } from "react";
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
  filterOptions,
  selectedFilter,
  onSelectFilter
}) {
  const [cameraError, setCameraError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const activeFilter = filterOptions.find((f) => f.id === selectedFilter);

  return (
    <div>
      <div className={styles.webcamStage}>
        {cameraError ? (
          <div className={styles.cameraPlaceholder}>
            <p>📷 Camera access is disabled</p>
            <p className={styles.placeholderSubtext}>
              Please enable camera permissions in your browser settings to take a photo,
              or upload one instead.
            </p>
          </div>
        ) : (
          <>
            { isLoading && (
              <div className={styles.loadingPlaceholder}>
                <div className={styles.spinner} />
                <p>Starting camera…</p>
              </div>
            )}
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
              mirrored
              className={styles.webcam}
              onUserMedia={() => setIsLoading(false)}
              onUserMediaError={() => {
                setCameraError(true);
                setIsLoading(false);
              }}
              style={{
                visibility: isLoading ? "hidden" : "visible",
                filter: activeFilter.css,
              }}
            />
          </>
        )}

        {countdown != null && (
          <div className={styles.countdownOverlay}>{countdown}</div>
        )}
      </div>

      {!cameraError && (
        <div className={styles.filterRow}>
          {filterOptions.map((cameraFilter) => (
            <button
              key={cameraFilter.id}
              className={`${styles.filterThumb} ${
                selectedFilter === cameraFilter.id ? styles.filterSelected : ""
              }`}
              onClick={() => onSelectFilter(cameraFilter.id)}
            >
              <span
                className={styles.filterPreview}
                style={{ filter: cameraFilter.css }}
              />
              <span className={styles.filterLabel}>{cameraFilter.name}</span>
            </button>
          ))}
        </div>
      )}

      <div className={styles.buttonRow}>
        {canTakePhoto && (
          <>
            {!cameraError && (
              <button className={btnStyles.btn} onClick={onCapture}>
                Take Photo
              </button>
            )}
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
          <button className={`${btnStyles.btn} ${btnStyles.redoBtn}`} onClick={onRedo}>
            ⟳ Redo
          </button>
        )}
      </div>
    </div>
  );
}

export default PhotoCapture;