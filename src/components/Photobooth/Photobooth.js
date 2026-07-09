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
  // number of photos taken or uploaded 
  const [photoCount, setPhotoCount] = useState(0);
  // check user's camera permissions for browser 
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  // drag uploaded 
  const [draggingPhoto, setDraggingPhoto] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  // 3 second coutdown to take photos 
  const [countdown, setCountdown] = useState(null);

  const [stickers, setStickers] = useState([]);
  const [draggingSticker, setDraggingSticker] = useState(null);
  const [selectedSticker, setSelectedSticker] = useState(null);

  // useEffects 
  useEffect(() => {
    if (!selectedFrame) return;
    // if frame is selected we want to create a new image and specify src to be the frame
    const img = new Image();
    img.src = selectedFrame;
    img.onload = () => {
      frameImgRef.current = img;
      drawCanvas();
    };
  }, [selectedFrame]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !frameImgRef.current) return;

    const ctx = canvas.getContext("2d");
    const frameWidth = frameImgRef.current.width;
    const frameHeight = frameImgRef.current.height;
    canvas.width = frameWidth;
    canvas.height = frameHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    photos.forEach((p) => {
      const slot = slots[p.slotIndex];
      const drawW = p.img.width * p.scale;
      const drawH = p.img.height * p.scale;
      const dx = slot.x + p.offsetX;
      const dy = slot.y + p.offsetY;

      ctx.save();
      ctx.beginPath();
      ctx.rect(slot.x, slot.y, SLOT_WIDTH, SLOT_HEIGHT);
      ctx.clip();
      ctx.drawImage(p.img, dx, dy, drawW, drawH);
      ctx.restore();
    });

    ctx.drawImage(frameImgRef.current, 0, 0, frameWidth, frameHeight);

    stickers.forEach((s, i) => {
      ctx.drawImage(s.img, s.x, s.y, 150, 150);
      if (i === selectedSticker) {
        ctx.strokeStyle = "#ff7aa2";
        ctx.lineWidth = 4;
        ctx.strokeRect(s.x, s.y, 150, 150);
      }
    });
  };

  // when there is a photo, change in photocount we want to draw canvas 
  useEffect(drawCanvas, [photos, stickers, selectedSticker, photoCount]);

  // Functions to handle photos
  const addPhoto = (img) => {
    // if we have four photos we do not want anymore 
    if (photoCount >= 4) return;

    const scale = SLOT_WIDTH / img.width;
    const drawH = img.height * scale;
    // if height is too much we can centre it 
    const offsetY = drawH > SLOT_HEIGHT ? (SLOT_HEIGHT - drawH) / 2 : 0;

    // store photos data
    setPhotos((p) => [
      ...p,
      { img, slotIndex: photoCount, scale, offsetX: 0, offsetY },
    ]);

    setCanTakePhoto(true);

    // update photocount
    setPhotoCount((c) => {
      const next = c + 1;
      // when we have enough photos can decorate it 
      if (next === 4) setMode("decorate");
      return next;
    });
  };

  const takePhotoNow = () => {
    const src = webcamRef.current.getScreenshot();
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => addPhoto(img);
  };

  // Helps with countdown of 3 secs when function is called whnenver user clicks
  // take photo button  
  const capturePhoto = () => {
    if (!canTakePhoto || countdown !== null) return;

    setCanTakePhoto(false);
    setCountdown(3);

    // 3 second countdown 
    let current = 3;
    const interval = setInterval(() => {
      current -= 1;
      if (current === 0) {
        clearInterval(interval);
        setCountdown(null);
        takePhotoNow();
      } else {
        setCountdown(current);
      }
    }, 1000);
  };

  const uploadPhoto = (e) => {
    // get target file that user has uploaded
    const file = e.target.files[0];
    if (!file) return;

    // file reader loads photo
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      // use add photo function to uplaod 
      img.onload = () => addPhoto(img);
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // remove last photo from photo array if user wants to re capture  
  const redoLastPhoto = () => {
    if (!photos.length) return;
    setPhotos((p) => p.slice(0, -1));
    setPhotoCount((c) => Math.max(0, c - 1));
    setCanTakePhoto(true);
  };

  // Functions for draggable/moveable photos 


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
