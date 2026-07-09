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

  // Functions for photo 


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
          
          ""
        )
        }
      </div>
    </div>
  );
}
