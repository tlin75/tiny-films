//  useRef for webcam, useState for stickers and frames, useEffect to react to the state changes
import React, {useRef, useState, useEffect } from 'react';
import Webcam from "react-webcam";

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
  width: 953,
  height: 599,
  faceingMode: "user"
}

const SLOT_WIDTH = 954;
const SLOT_HEIGHT = 599;

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
}