const mitt = require("mitt");
const robot = require("robotjs");
const io = require("socket.io-client");
const SimpleSignalClient = require("simple-signal-client");

export const emitter = mitt();

let _SOCKET = null, _SignalClient = null;

enum connectionState = {
    CONNECTED,
    CONNECTING,
    FAILED
};

enum SOCKET_EVENTS = {
    VIDEO_ENABLED,
    VIDEO_DISABLED,
    AUDIO_ENABLED,
    AUDIO_DISABLED,
    VIDEO_PAUSED,
    VIDEO_RESUMED,
    AUDIO_MUTED,
    AUDIO_UNMUTED
};

enum CHAT_EVENTS = {
    TYPING,
    CHAT,
    NOT_TYPING
};

export const countWords = (doc) => {
  let count = 0, iter = doc.iter()
  while (!iter.next().done) {
    let inWord = false
    for (let i = 0; i < iter.value.length; i++) {
      let word = /\w/.test(iter.value[i])
      if (word && !inWord) count++
      inWord = word
    }
  }
  return `Word count: ${count}`
};

export const wordCountPanel = (view) => {
  let dom = document.createElement("div")
  dom.textContent = countWords(view.state.doc)
  return {
    dom,
    update(update) {
      if (update.docChanged)
        dom.textContent = countWords(update.state.doc)
    }
  }
};

const handleClick = (e) => {
      const { offsetX, offsetY } = e;
      const video = document.getElementById("video");
      const size = { width: video.offsetWidth, height: video.offsetHeight };
      rtcInstance.mouseClick(offsetX, offsetY, size);
    };

const mouseClick = (x, y, size) => {
        const event = {
          click: true,
          ...transformFromPixelsToPercent(x, y, size),
        };
        p.send(JSON.stringify(event));
      },

/**
 * Transform a screen location
 * from percentage to pixels
 * @param {number} x - The X Coordinate
 * @param {number} y - The X Coordinate
 * @param {object} size - The screen size
 * @param {number} size.width
 * @param {number} size.height
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate
 * @property {number} y - The Y Coordinate
 * @returns {Point} - The location of the event
 */
export const transformFromPixelsToPercent = (x, y, size) => {
  const { width, height } = size;
  const percentX = parseFloat((x * 100) / width).toFixed(2);
  const percentY = parseFloat((y * 100) / height).toFixed(2);
  return { x: percentX, y: percentY };
}

/**
 * Transform a screen location
 * from percentage to pixels
 * @param {number} x - The X Coordinate
 * @param {number} y - The X Coordinate
 * @param {object} size - The screen size
 * @param {number} size.width
 * @param {number} size.height
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate
 * @property {number} y - The Y Coordinate
 * @returns {Point} - The location of the event
 */
export const transformFromPercentToPixels = (x, y, size) => {
  const { width, height } = size;
  const pixelsX = parseFloat((x / 100) * width).toFixed(0);
  const pixelsY = parseFloat((y / 100) * height).toFixed(0);
  return { x: pixelsX, y: pixelsY };
}

/**
 * Create mouse event in offer
 * @param {object} data
 * @property {number} data.x - The X Coordinate
 * @property {number} data.y - The Y Coordinate
 */
export function mouseClickEvent(data) {
  robot.moveMouse(data.x, data.y);
  robot.mouseToggle("up", "left");
  robot.mouseClick();
}

export const createSocket = () => {
    if(_SOCKET) return _SOCKET;
    _SOCKET = io("URL", { rejectUnauthorized: false }); // transports: ['websockets']
    return _SOCKET;
};

export const getSignalClient = () => {
    if(_SignalClient) return _SignalClient;
    _SignalClient = new SimpleSignalClient(_SOCKET);
    return _SignalClient;
};

export const blah = () => {
    // Older browsers may not have srcObject
  if ("srcObject" in video) {
    video.srcObject = stream;
  } else {
    // Avoid using this in new browsers, as it is going away.
    video.src = window.URL.createObjectURL(stream);
  }
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
};

