import './App.css';
import React from "react";
import PhotoBooth from "./components/Photobooth/Photobooth";
import "./styles/global.css";
import styles from "./App.css";
const logoSrc = "/assets/logo/tinyfilms-logo.png";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img className={styles.logoPic} src={logoSrc} alt="TinyFilms Logo" />
        <h1 className={styles.logoName}>
          TinyFilms Photobooth
        </h1>
      </div>

      <div className={styles.appContent}>
        <PhotoBooth />  {/* Fixed: capital B to match the import */}
      </div>
    </div>
  );
}

export default App;