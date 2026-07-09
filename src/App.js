import './App.css';
import React from "react";
import PhotoBooth from "./components/Photobooth/Photobooth";
import "./styles/global.css";
const logoSrc = "/assets/logo/tinyfilms-logo.png";

function App() {
  return (
    <div className="app">
      <div className="appHeader">
        <img className="logoPic" src={logoSrc} alt="TinyFilms Logo" />
        <h1 className="logoName">TinyFilms Photobooth</h1>
      </div>
      <div className="appContent">
        <PhotoBooth />
      </div>
    </div>
  );
}

export default App;