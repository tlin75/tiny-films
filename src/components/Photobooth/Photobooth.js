//  useRef for webcam, useState for stickers and frames, useEffect to react to the state changes
import React, {useRef, useState, useEffect } from 'react';
import Webcam from "react-webcam";
import styles from "./Photobooth.module.css";
import Header from "./Header";
import FrameSelector from "./FrameSelector/FrameSelector";
import PhotoCapture from "./PhotoCapture/PhotoCapture";
import StickerPicker from "./StickerPicker/StickerPicker";
import PhotoCanvas from "./PhotoCanvas/PhotoCanvas";
import { frameOptions } from "../../data/frameOptions";
import { stickerOptions } from "../../data/stickerOptions";

const videoConstraints = {
  width: 881,
  height: 493,
  faceingMode: "user"
}

const SLOT_WIDTH = 881;
const SLOT_HEIGHT = 493;

export default function PhotoBooth() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const frameImgRef = useRef(null);

  const slots = [
    {x: 63.7, y: 73.1},
    {x: 63.7, y: 616.3},
    {x: 63.7, y: 1159.6}, 
    {x: 63.7, y: 1702.9},
  ]

  const [selectedFrame, setSelectedFrame] = useState(null);
  const [mode, setMode] = useState("photo");

  const [photos, setPhotos] = useState([]);
  const [photoCount, setPhotoCount] = useState(0);
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const [draggingPhoto, setDraggingPhoto] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState(null);

  const [stickers, setStickers] = useState([]);
  const [draggingSticker, setDraggingSticker] = useState(null);
  const [selectedSticker, setSelectedSticker] = useState(null);

  // useEffects 
  
  const handleBackBtn = () => {
    if (mode === "decorate") {
      setMode("photo");
      setCanTakePhoto(false);
      setStickers([]);
      setSelectedSticker(null);
    } else {
      // if mode is photo
      setSelectedFrame(null);
      setPhotos([]);
      setPhotoCount(0);
      setStickers([]);
      setSelectedSticker(null);
      setMode("photo");
      setCanTakePhoto(true);
    }
  }

  return (
    <div className={styles.centreCol}>
      <Header selectedFrame={selectedFrame} mode={mode} onBack={handleBackBtn} />

      <div className={styles.mainContent}>
        {!selectedFrame ? (
          // map the frame options with the file name 
          <FrameSelector
            frameOptions={frameOptions}
            selectedFrame={selectedFrame}
            onSelect={setSelectedFrame}
          />
        ) : (
          <div className={styles.row}>
            <div>
              {mode === "photo" && (
                <PhotoCapture
                  webcamRef={webcamRef}
                  videoConstraints={videoConstraints}
                  countdown={countdown}
                  canTakePhoto={canTakePhoto}
                  photoCount={photoCount}
                  onCapture={capturePhoto}
                  onUpload={uploadPhoto}
                  onRedo={redoLastPhoto}
                />
              )}
              {mode === "decorate" && (
                <StickerPicker
                  stickerOptions={stickerOptions}
                  onAddSticker={addSticker}
                />
              )}
            </div>

            <PhotoCanvas
              canvasRef={canvasRef}
              mode={mode}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onDownload={downloadPhoto}
            />
          </div>
        )}
      </div>
    </div>
  );
}
