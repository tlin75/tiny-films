import styles from './FrameSelector.module.css';

function FrameSelector({ frameOptions, selectedFrame, onSelect }) {
  // return the image of selected frame 
  return (
    <div className={styles.grid}>
      
      {frameOptions.map((src) => {
        // if the selected frame is src then make selected be true
        return (
          <img
          className={
            `${styles.frameThumb} ${
            selectedFrame === src 
            ? styles.selected : ""}`
          }
          key={src}
          src={src}
          alt="film frame"
          // set the selected frame as current frame
          onClick={() => onSelect(src)}
        />
        )
      })}
    </div>
  )
}

export default FrameSelector