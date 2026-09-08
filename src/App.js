import './App.css';
import React, { useState } from "react";
import PhotoBooth from "./components/Photobooth/Photobooth";
import "./styles/global.css";
const logoSrc = "/assets/logo/tiny-films-logo.png";

function App() {
  // mode is always one of: "welcome" | "frame" | "photo" | "decorate"
  // "welcome" → "frame" → "photo" → "decorate"
  const [mode, setMode] = useState("welcome");

  const goToWelcome = () => setMode("welcome");

  return (
    <div className="app">
      <div className="appHeader">
        <img
          className="logoPic"
          src={logoSrc}
          alt="TinyFilms Logo"
          onClick={goToWelcome}
          style={{ cursor: "pointer" }}
        />
        <h1 className="logoName" onClick={goToWelcome} style={{ cursor: "pointer" }}>
          Tiny Films
        </h1>
      </div>
      <div className="appContent">
        <PhotoBooth mode={mode} setMode={setMode} />
      </div>
    </div>
  );
}

export default App;