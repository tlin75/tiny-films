//  useRef for webcam, useState for stickers and frames, useEffect to react to the state changes
import React, {useRef, useState, useEffect } from 'react';
import Webcam from "react-webcam";
import styles from "../styles/Photobooth.module.css";

// import the frames and stickers 
const frameOptions = [
  "/assets/frames/azure-beach.png",
  "/asset/frames/azure-frame.png",
  "/asset/frames/black-frame.png",
  "/asset/frames/cream-flowers.png",
  "/asset/frames/cream-frame.png",
  "/asset/frames/cream-simple.png",
  "/asset/frames/cyan-frame.png",
  "/asset/frames/cyan-underwater.png",
  "/asset/frames/pink-cherry-blossom.png",
  "/asset/frames/pink-frame.png",
  "/asset/frames/purple-frame.png",
  "/asset/frames/purple-simple.png",
  "/asset/frames/yellow-frame.png",
  "/asset/frames/yellow-simple.png",
];

const stickerOptions = [
  "/assets/stickers/cat-and-chick.png",
  "/assets/stickers/cat-battery.png",
  "/assets/stickers/cat-cafe.png",
  "/assets/stickers/cat-coffee-mug.png",
  "/assets/stickers/cat.png",
  "/assets/stickers/cats-in-box.png",
  "/assets/stickers/coffee-bean-bag.png",
  "/assets/stickers/cute-rabbit.png",
  "/assets/stickers/flower.png",
  "/assets/stickers/heart-left.png",
  "/assets/stickers/heart-right.png",
  "/assets/stickers/pink-macaron.png",
  "/assets/stickers/pink-pocky.png",
  "/assets/stickers/pretzel.png",
  "/assets/stickers/rabbit-icecream.png",
  "/assets/stickers/rabbit-strawberry-bread.png",
  "/assets/stickers/rainbow.png",
  "/assets/stickers/shooting-star.png",
  "/assets/stickers/star.png",
  "/assets/stickers/strawberry-cake.png",
  "/assets/stickers/strawberry-yakult.png",
  "/assets/stickers/strawberry.png",
];

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
  const row = { display: "flex", gap: 40, alignItems: "flex-start" };

  // useEffects 
  


  return (
    <div className={styles.centreCol}>
      {/* header with back button and text */}
      <div className={styles.headerBar}>
        <button className={styles.backBtn} onClick={handleBack}>
          &larr; Back
        </button>
        <h1 className={styles.titleBar}>
          {
            !selectedFrame
            ? "₊✩‧₊˚ Select a frame౨ৎ ˚₊✩‧₊"
            : mode === "photo"
                ? "⋆｡‧˚ʚ Smile :)ɞ˚‧｡⋆"
                : ". ݁₊ ⊹ . ݁Let’s decorate . ⊹ ₊ ݁."
          }
        </h1>

        <div className={styles.mainContent}>
          {/* map every frame we have created from assets */}
          
        </div>
      </div>
    </div>
  )
}