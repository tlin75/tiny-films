//  useRef for webcam, useState for stickers and frames, useEffect to react to the state changes
import React, {useRef, useState, useEffect, useMemo, useCallback } from 'react';
import styles from "./Photobooth.module.css";
import Header from "./Header";
import Welcome from "./Welcome/Welcome";
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

function PhotoBooth({ mode, setMode }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const frameImgRef = useRef(null);

  const slots = useMemo(() => [
    { x: 63.7, y: 73.1 },
    { x: 63.7, y: 616.3 },
    { x: 63.7, y: 1159.6 },
    { x: 63.7, y: 1702.9 },
  ], []);

  const [selectedFrame, setSelectedFrame] = useState(null);
  
  // Welcome screen "Get Started" button:
  const handleGetStarted = () => setMode("frame");

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

  const drawCanvas = useCallback((withSelectionOutline = true) => {
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

    const BOX = 250;
    stickers.forEach((s, i) => {
      // scale to fit within the box while keeping aspect ratio
      const scale = Math.min(BOX / s.img.width, BOX / s.img.height);
      const drawW = s.img.width * scale;
      const drawH = s.img.height * scale;

      // center the scaled image within the 250x250 box
      const offsetX = (BOX - drawW) / 2;
      const offsetY = (BOX - drawH) / 2;

      ctx.drawImage(s.img, s.x + offsetX, s.y + offsetY, drawW, drawH);

      // only draw the outline if requested AND this sticker is selected
      if (withSelectionOutline && i === selectedSticker) {
        ctx.strokeStyle = "#ff7aa2";
        ctx.lineWidth = 4;
        ctx.strokeRect(s.x, s.y, BOX, BOX);
      }
    });
  }, [photos, stickers, selectedSticker, slots]);

  // useEffects 
  useEffect(() => {
    if (mode === "welcome") {
      setSelectedFrame(null);
      setPhotos([]);
      setPhotoCount(0);
      setStickers([]);
      setSelectedSticker(null);
      setCanTakePhoto(true);
    }
  }, [mode]);
  
  useEffect(() => {
    if (!selectedFrame) return;
    // if frame is selected we want to create a new image and specify src to be the frame
    const img = new Image();
    img.src = selectedFrame;
    img.onload = () => {
      frameImgRef.current = img;
      drawCanvas();
    };
  }, [selectedFrame, drawCanvas]);

  // when there is a photo, change in photos or stickers we want to draw canvas 
  useEffect(drawCanvas, [photos, stickers, selectedSticker, photoCount, drawCanvas]);
  
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

  // Function for getting coordinates of mouse when it has been clicked or dragged
  const getCoords = (e) => {
    // convert screen pixel to canvas pixels
    const r = canvasRef.current.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (canvasRef.current.width / r.width),
      y: (e.clientY - r.top) * (canvasRef.current.height / r.height),
    };
  };

  // Functions for draggable/moveable photos 
  const handleMouseDown = (e) => {
    const { x, y } = getCoords(e);

    if (mode === "photo") {
      // Go through every photo
      for (let i = photos.length - 1; i >= 0; i--) {
        // get the photo data and positions 
        const p = photos[i];
        const slot = slots[p.slotIndex];
        const w = p.img.width * p.scale;
        const h = p.img.height * p.scale;

        // check if it is the photo that was clicked 
        if (
          x >= slot.x + p.offsetX &&
          x <= slot.x + p.offsetX + w &&
          y >= slot.y + p.offsetY &&
          y <= slot.y + p.offsetY + h
        ) {
          // set dragging photo to current photo 
          setDraggingPhoto(i);
          setDragOffset({
            x: x - slot.x - p.offsetX,
            y: y - slot.y - p.offsetY,
          });
          return;
        }
      }
    }

    if (mode === "decorate") {
      // look through all the stickers draw image using info 
      // if sticker is selected have rectangle around to help user know which sticker is selected
      for (let i = stickers.length - 1; i >= 0; i--) {
        const s = stickers[i];
        if (x >= s.x && x <= s.x + 250 && y >= s.y && y <= s.y + 250) {
          setDraggingSticker(i);
          setSelectedSticker(i);
          setDragOffset({ x: x - s.x, y: y - s.y });
          return;
        }
      }
    }
  };

  // Handle the user's dragging movement that repositions photo/sticker
  const handleMouseMove = (e) => {
    const { x, y } = getCoords(e);
    
    // Update the photo data when in photo mode 
    if (draggingPhoto !== null && mode === "photo") {
      setPhotos((prev) => {
        const updated = [...prev];
        const p = updated[draggingPhoto];
        const slot = slots[p.slotIndex];
        const w = p.img.width * p.scale;
        const h = p.img.height * p.scale;

        // clamp photo to slots so they don't exceed the boundaries 
        p.offsetX = x - slot.x - dragOffset.x;
        p.offsetY = y - slot.y - dragOffset.y;
        p.offsetX = Math.min(Math.max(p.offsetX, SLOT_WIDTH - w), 0);
        p.offsetY = Math.min(Math.max(p.offsetY, SLOT_HEIGHT - h), 0);

        return updated;
      });
    }

    if (draggingSticker != null && mode === "decorate") {
      setStickers((s) => {
        const u = [...s];
        u[draggingSticker] = {
          ...u[draggingSticker],
          x: x - dragOffset.x,
          y: y - dragOffset.y,
        };
        return u;
      });
    }
  };

  const handleMouseUp = () => {
    setDraggingPhoto(null);
    setDraggingSticker(null);
  };

  // Function for stickers
  const addSticker = (src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setStickers((s) => [...s, { img, x: 400, y: 100 }]);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        // user can use delete or backspace to delete sticker 
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedSticker != null &&
        mode === "decorate"
      ) {
        setStickers((s) => s.filter((_, i) => i !== selectedSticker));
        setSelectedSticker(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedSticker, mode]);

  // Handle back button in photo capture mode to go to select frame mode
  const handleBackBtn = () => {
    if (mode === "decorate") {
      setMode("photo");
      setStickers([]);
      setSelectedSticker(null);
    } else if (mode === "photo") {
      setSelectedFrame(null);
      setPhotos([]);
      setPhotoCount(0);
      setMode("frame");
    }
    // no back button needed from "frame" or "welcome"
  };

  const downloadPhoto = () => {
  // redraw without the selection outline
  drawCanvas(false);

  const a = document.createElement("a");
  a.href = canvasRef.current.toDataURL("image/png");
  a.download = "tiny-films.png";
  a.click();

  // restore the normal view (with outline, if something is still selected)
  drawCanvas(true);
};

  return (
    <div className={styles.centreCol}>
      {mode === "welcome" ? (
        <Welcome onGetStarted={handleGetStarted} />
      ) : (
        <>
          <Header selectedFrame={selectedFrame} mode={mode} onBack={handleBackBtn} />

          <div className={styles.mainContent}>
            {mode === "frame" ? (
              <FrameSelector
                frameOptions={frameOptions}
                selectedFrame={selectedFrame}
                onSelect={(frame) => {
                  setSelectedFrame(frame);
                  setMode("photo");
                }}
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
        </>
      )}
    </div>
  );
}

export default PhotoBooth