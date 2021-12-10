const require = name => new URL(name, import.meta.url).href;
const SimpleSignalClient = require("simple-signal-client");
// import SimpleSignalClient from "simple-signal-client";
import mitt from "mitt";
import io from "socket.io-client";
import { debounce } from "lodash-es";

export const emitter = mitt();

export const piniaLogger = ({ store }) => {
  store.$subscribe((mutation, state) => {
    let mut = `{"store": ${mutation.storeId}, "type": ${mutation.type}, "payload": ${mutation.payload}}`;

    console.log(JSON.parse(JSON.stringify(mut)));
  });
  store.$onAction(action => {
    let act = `{"store": ${action.store.$id}, "action": ${action.name}, "payload": ${action.args}}`;

    console.log(JSON.parse(JSON.stringify(act)));
  });
};

export const piniaDebounce = ({ options, store }) => {
  console.log(options);
  if (options.debounce) {
    // we are overriding the actions with new ones
    return Object.keys(options.debounce).reduce((debouncedActions, action) => {
      debouncedActions[action] = debounce(store[action], options.debounce[action]);
      return debouncedActions;
    }, {});
  }
};

let _SOCKET = null,
  _SignalClient = null;

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
  return `wc: ${count}`;
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

export const getMedia = async (audio = true, video = true) => {
  try {
    const constraints = {
      video: video,
      audio: audio,
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

export const setSrcObject = (element, f) => {
  if ("srcObject" in element) {
    try {
      // eslint-disable-next-line no-param-reassign
      element.srcObject = f; // this is the new way. only safari supports multiple inputs, it is possible to put here media streams and files and blobs, but current new browsers support only media stream so need a fallback.
    } catch (e) {
      if (e.name !== "TypeError") throw e;
      // Avoid using this in new browsers, as it is going away.
      // eslint-disable-next-line no-param-reassign
      element.src = URL.createObjectURL(f);
    }
  }
  // eslint-disable-next-line no-param-reassign
  else element.src = URL.createObjectURL(f);
};
