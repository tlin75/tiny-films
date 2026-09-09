import { useState, useMemo } from 'react';
import styles from './FrameSelector.module.css';
import btnStyles from '../Buttons.module.css';

const themes = [
  {
    label: "Light Blue",
    match: (src) => src.includes("/light-azure-") || src.includes("/blue-"),
  },
  {
    label: "Dark Blue",
    match: (src) => src.includes("/azure-") ||  src.includes("/dark-blue-"),
  },
  {
    label: "Cream/Yellow",
    match: (src) => src.includes("/cream-") || src.includes("/yellow-"),
  },
  {
    label: "Pink/Purple",
    match: (src) => src.includes("/pink-") || src.includes("/purple-"),
  },
  {
    label: "Black",
    match: (src) => src.includes("/black-"),
  },
  {
    label: "White",
    match: (src) => src.includes("/white-"),
  },
];

function FrameSelector({ frameOptions, selectedFrame, onSelect }) {
  // set default theme to show light blue
  const [selectedTheme, setSelectedTheme] = useState(themes[0].label);

  const filteredFrames = useMemo(() => {
    const activeTheme = themes.find((t) => t.label === selectedTheme);
    return frameOptions.filter(activeTheme.match);
  }, [frameOptions, selectedTheme])

  // return the image of selected frame 
  return (
    <div>
      <div className={styles.themeRow}>
        {themes.map((theme) => (
          <button
            key={theme.label}
            className={`${btnStyles.btn} ${
              selectedTheme === theme.label ? styles.themeSelected : ""
            }`}
            onClick={() => setSelectedTheme(theme.label)}
          >
            {theme.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        
        {filteredFrames.map((src) => {
          // if the selected frame is src then make selected be true
          return (
            <img
            className={
              `${styles.frameThumb} ${
              selectedFrame === src ? styles.selected : ""}`
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
    </div>
  )
}

export default FrameSelector