const require = name => new URL(name, import.meta.url).href;
// const robot = require("robotjs");
// const { mouse, left, right, up, down, straightTo, Point } = require("@nut-tree/nut-js");
const SimpleSignalClient = require("simple-signal-client");
// import SimpleSignalClient from "simple-signal-client";
import mitt from "mitt";
import io from "socket.io-client";

export const emitter = mitt();

let _SOCKET = null,
  _SignalClient = null;

const CONNECTION_STATE = {
  CONNECTED: "CONNECTED",
  CONNECTING: "CONNECTING",
  FAILED: "FAILED",
};

const SOCKET_EVENTS = {
  VIDEO_ENABLED: "VIDEO_ENABLED",
  VIDEO_DISABLED: "VIDEO_DISABLED",
  AUDIO_ENABLED: "AUDIO_ENABLED",
  AUDIO_DISABLED: "AUDIO_DISABLED",
  VIDEO_PAUSED: "VIDEO_PAUSED",
  VIDEO_RESUMED: "VIDEO_RESUMED",
  AUDIO_MUTED: "AUDIO_MUTED",
  AUDIO_UNMUTED: "AUDIO_UNMUTED",
};

const CHAT_EVENTS = {
  TYPING: "TYPING",
  CHAT: "CHAT",
  NOT_TYPING: "NOT_TYPING",
};

class coordsAndSize {
  constructor(event, video) {
    this.x = event.clientX - video.getBoundingClientRect().left;
    this.y = event.clientY - video.getBoundingClientRect().top;
    this.videoWidth = video.getBoundingClientRect().width;
    this.videoHeight = video.getBoundingClientRect().height;
  }
}

function convertCoord(coords, xy) {
  if (xy === "x") {
    return (robot.getScreenSize().width * coords.x) / coords.videoWidth;
  } else if (xy === "y") {
    return (robot.getScreenSize().height * coords.y) / coords.videoHeight;
  } else {
    return;
  }
}

const nut_ex = async () => {
  await mouse.move(left(500));
  await mouse.move(up(500));
  await mouse.move(right(500));
  await mouse.move(down(500));

  mouse.config.mouseSpeed = 2000;
  const fast = new Point(500, 350);
  await mouse.move(straightTo(fast));
  mouse.config.mouseSpeed = 100;
  const slow = new Point(100, 150);
  await mouse.move(straightTo(slow));
};

export const countWords = doc => {
  let count = 0,
    iter = doc.iter();
  while (!iter.next().done) {
    let inWord = false;
    for (let i = 0; i < iter.value.length; i++) {
      let word = /\w/.test(iter.value[i]);
      if (word && !inWord) count++;
      inWord = word;
    }
  }
  return `Word count: ${count}`;
};

export const wordCountPanel = view => {
  let dom = document.createElement("div");
  dom.textContent = countWords(view.state.doc);
  return {
    dom,
    update(update) {
      if (update.docChanged) dom.textContent = countWords(update.state.doc);
    },
  };
};

const handleClick = e => {
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
};

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
};

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
};

/**
 * Create mouse event in offer
 * @param {object} data
 * @property {number} data.x - The X Coordinate
 * @property {number} data.y - The Y Coordinate
 */
export const mouseClickEvent = data => {
  robot.moveMouse(data.x, data.y);
  robot.mouseToggle("up", "left");
  robot.mouseClick();
};

export const createSocket = () => {
  if (_SOCKET) return _SOCKET;
  _SOCKET = io("URL", { rejectUnauthorized: false }); // transports: ['websockets']
  return _SOCKET;
};

export const getSignalClient = () => {
  if (_SignalClient) return _SignalClient;
  _SignalClient = new SimpleSignalClient(_SOCKET);
  return _SignalClient;
};

export const gotStream = () => {
  // Older browsers may not have srcObject
  if ("srcObject" in video) {
    video.srcObject = stream;
  } else {
    // Avoid using this in new browsers, as it is going away.
    video.src = window.URL.createObjectURL(stream);
  }
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
};

export const connectToPeer = peerId => {
  const signalClient = getSignalClient();
  const peer = signalClient.connectToPeer(peerId);
  peer.on("connected", () => {
    console.log("connected to peer");
  });
  peer.on("data", data => {
    console.log("data received: ", data);
    if (data.type === VIDEO_EVENTS.VIDEO_RESUMED) {
      video.play();
    } else if (data.type === VIDEO_EVENTS.AUDIO_MUTED) {
      video.muted = true;
    } else if (data.type === VIDEO_EVENTS.AUDIO_UNMUTED) {
      video.muted = false;
    }
  });
  peer.on("error", error => {
    console.log("error: ", error);
  });
  peer.on("close", () => {
    console.log("close");
  });
};

export const connectToPeerWithPeerId = peerId => {
  const socket = createSocket();
  socket.on("connect", () => {
    console.log("connected");
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
  socket.on("peer", peerId => {
    console.log("peer: ", peerId);
    connectToPeer(peerId);
  });

  socket.on("signal", data => {
    console.log("signal: ", data);
    const signalClient = getSignalClient();
    signalClient.sendSignal(data);
  });

  socket.on("peer-signal", data => {
    console.log("peer-signal: ", data);
    const signalClient = getSignalClient();
    signalClient.receiveSignal(data);
  });
  socket.on("message", data => {
    console.log("message: ", data);
    if (data.type === "peer-id") {
      connectToPeer(data.peerId, socket);
    }
  });
};

export const mediaUnsurported = () => {
  if (!navigator.getUserMedia) return false;
  return true;
};

export const getMedia = async () => {
  try {
    const constraints = {
      video: true,
      audio: true,
    };
    const stream = await getUserMedia(constraints);
    return stream;
  } catch (err) {
    console.log("getUserMedia() error: ", err);
  }
};

export const getVideo = async () => {
  try {
    const constraints = {
      video: true,
      audio: false,
    };
    const stream = await getUserMedia(constraints);
    return stream;
  } catch (err) {
    console.log("getUserMedia() error: ", err);
  }
};

export const getAudio = async () => {
  try {
    const constraints = {
      video: false,
      audio: true,
    };
    const stream = await getUserMedia(constraints);
    return stream;
  } catch (err) {
    console.log("getUserMedia() error: ", err);
  }
};

export const getUserMedia = async constraints => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (err) {
    console.log("getUserMedia() error: ", err);
  }
};

const isValidUrl = url => {
  const regex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  let validUrl = regex.test(url);
  return validUrl;
};

// Gibberish, for now..
const scrollProgress = () => {
  return {
    init() {
      window.addEventListener("scroll", () => {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        this.percent = Math.round((winScroll / height) * 100);
      });
    },
    circumference: 30 * 2 * Math.PI,
    percent: 0,
  };
};
