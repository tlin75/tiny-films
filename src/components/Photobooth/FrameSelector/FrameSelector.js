import React from 'react';
import styles from './FrameSelector.module.css';

function FrameSelector({ frameOptions, selectedFrame, onSelect }) {
  return (
    <div className={styles.grid}>
      {frameOptions.map((src) => {
        <img
          className={
            `${styles.frameThumb} ${
            selectedFrame === src 
            ? styles.selected : ""}`
          }
          key={src}
          src={src}
          alt="film frame"
          onClick={() => onSelect(src)}
        />
      })}
    </div>
  )
}

export default FrameSelector