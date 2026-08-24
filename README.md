# TinyFilms Photobooth

A browser-based photobooth app where user can pick a film-strip frame, capture or upload photos, then decorate their strip with stickers. Everything is composited live on an HTML5 canvas so you get a downloadable, shareable film strip.

![TinyFilms Photobooth banner](public/assets/logo/tinyfilms-logo.png)

## Features

- Live webcam capture with a 3-second countdown, or upload your own photos
- Frame selection: Choose from a variety of pastel/aesthetic film-strip frames
- Drag-and-drop editing: position photos within their slots after capture
- Sticker decoration mode: add, drag, select and delete stickers on your strip
- Keyboard support: delete a selected sticker using `Backspace`/`Delete` keys
- Redo: remove the last photo and recapture if you're not happy with it

## Tech Stack

- Frontend: React, HTML, CSS

## Project Structure

```
src/
├── components/
│   └── Photobooth/
│       ├── Photobooth.js 
│       ├── Header.js          
│       ├── FrameSelector/
│       ├── PhotoCapture/   
│       ├── PhotoCanvas/ 
│       └── StickerPicker/ 
├── data/
│   ├── frameOptions.js  
│   └── stickerOptions.js  
└── styles/
    └── global.css

public/
└── assets/
    ├── frames/      
    ├── stickers/    
    └── fonts/        
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/tlin75/tiny-film.git
cd tiny-film

# Install dependencies
npm install

# Start the development server
npm start
```

Currently, the app runs at `http://localhost:3000`.

> **Note:** Your browser will ask for camera permission on first use — this is required for the webcam capture feature to work.

## Usage

1. **Select a frame** from the carousel on the home screen.
2. **Take or upload 4 photos** to fill the frame's photo slots
3. Once all 4 slots are filled, you're moved into **decorate mode** where you pick stickers and drag them anywhere on your strip.
4. Click a sticker to select it (shown with a pink outline), then press `Delete`/`Backspace` to remove it.
5. Click download to get a png of your film strip.
6. Use the **Back** button to return to the previous step at any time.

## Further Implementation
- [ ] Add more filters/effects to captured photos
- [ ] Sticker resizing via drag handles
- [ ] Mobile responsiveness + touch support for dragging photos/stickers

## Credits
Designed in Figma and Canva using 
- Fonts: Nunito, Fredoka, Magnifico Daytime ITC.
- Icons: Canva, Freepik.
