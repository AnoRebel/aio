<script>
import { onMounted, ref, onBeforeUnmount } from "vue";

export default {
  name: "VoicePlayer",
  props: {
    audio: {
      type: Object,
      required: true,
    },
    muted: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    onMounted(() => {
      let blob = URL || webkitURL;
      rangeRef.value.value = 0;
      playerRef.value.addEventListener(
        "canplaythrough",
        () => onTimeUpdate(playerRef.value, rangeRef.value),
        false
      );
      playerRef.value.addEventListener("timeupdate", () =>
        onTimeUpdate(playerRef.value, rangeRef.value)
      );
      playerRef.value.addEventListener("waiting", e => (waiting.value = true));
      playerRef.value.addEventListener("ended", () => (rangeRef.value.value = 0));
    });
    const waiting = ref(false);
    const rangeRef = ref(null);
    const playerRef = ref(null);
    const lefttoplay = ref(null);
    const righttoplay = ref(null);
    const lefttopause = ref(null);
    const righttopause = ref(null);
    const audioDuration = ref("0:00 / 0:00");

    const rangeChange = e => (playerRef.value.currentTime = e.target.value);
    const onTimeUpdate = (player, ranger) => {
      let duration = `${Math.floor(player.duration / 60)}:${(parseInt(player.duration, 10) % 60)
        .toString()
        .padStart(2, 0)}`;
      let currTime = `${Math.floor(player.currentTime / 60)}:${(
        parseInt(player.currentTime, 10) % 60
      )
        .toString()
        .padStart(2, 0)}`;
      waiting.value = false;
      audioDuration.value = `${currTime} / ${duration}`;
      ranger.value = player.currentTime;
    };

    const togglePlay = () => {
      if (playerRef.value.paused) {
        playerRef.value.play();
        lefttopause.value.beginElement();
        righttopause.value.beginElement();
      } else {
        playerRef.value.pause();
        lefttoplay.value.beginElement();
        righttoplay.value.beginElement();
      }
    };
    onBeforeUnmount(() => {
      playerRef.value.removeEventListener(
        "canplaythrough",
        onTimeUpdate(playerRef.value, rangeRef.value),
        false
      );
      playerRef.value.removeEventListener(
        "timeupdate",
        onTimeUpdate(playerRef.value, rangeRef.value)
      );
      playerRef.value.removeEventListener("waiting", e => (waiting.value = true));
      playerRef.value.removeEventListener("ended", () => (rangeRef.value.value = 0));
    });
    return {
      playerRef,
      rangeRef,
      rangeChange,
      lefttoplay,
      righttoplay,
      lefttopause,
      righttopause,
      togglePlay,
      audioDuration,
      waiting,
    };
  },
};
</script>

<template>
  <div class="relative ml-3 text-sm px-2 shadow rounded-2xl">
    <audio ref="playerRef" :muted="muted" preload="metadata" class="hidden">
      <source :src="audio.src" :type="audio.type" />
      <a :href="audio.src" download>Download</a>
    </audio>
    <div class="flex flex-row items-center">
      <button
        class="
          flex
          items-center
          justify-center
          bg-blue-500
          hover:bg-blue-600
          rounded-full
          h-8
          w-10
          text-white
          focus:outline-none
        "
        @click="togglePlay"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 p-1"
          viewBox="0 0 50 50"
          id="playpause"
          fill="currentColor"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <title>Play</title>
          <polygon points="12,0 25,11.5 25,39 12,50" id="leftbar" />
          <polygon points="25,11.5 39.7,24.5 41.5,26 39.7,27.4 25,39" id="rightbar" />
          <animate
            to="7,3 19,3 19,47 7,47"
            id="lefttopause"
            ref="lefttopause"
            xlink:href="#leftbar"
            attributeName="points"
            dur=".3s"
            begin="indefinite"
            fill="freeze"
          />
          <animate
            to="12,0 25,11.5 25,39 12,50"
            id="lefttoplay"
            ref="lefttoplay"
            xlink:href="#leftbar"
            attributeName="points"
            dur=".3s"
            begin="indefinite"
            fill="freeze"
          />
          <animate
            to="31,3 43,3 43,26 43,47 31,47"
            id="righttopause"
            ref="righttopause"
            xlink:href="#rightbar"
            attributeName="points"
            dur=".3s"
            begin="indefinite"
            fill="freeze"
          />
          <animate
            to="25,11.5 39.7,24.5 41.5,26 39.7,27.4 25,39"
            id="righttoplay"
            ref="righttoplay"
            xlink:href="#rightbar"
            attributeName="points"
            dur=".3s"
            begin="indefinite"
            fill="freeze"
          />
        </svg>
      </button>
      <div class="w-full flex flex-row items-center ml-1.5">
        <div class="flex flex-grow">
          <input ref="rangeRef" type="range" min="0" step="any" @change="rangeChange" />
        </div>
        <div class="flex flex-shrink">
          <span v-if="waiting" class="text-gray-900">
            <svg
              class="animate-spin ml-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
          <span v-else class="whitespace-nowrap ml-1 text-xs">{{ audioDuration }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
input[type="range"] {
  height: var(--range-height);
  -webkit-appearance: none;
  margin: var(--range-margin);
  width: var(--range-width);
  background: var(--range-background);
}
input[type="range"]:focus {
  outline: none;
}

// Range Track
input[type="range"]::-webkit-slider-runnable-track {
  width: var(--track-width);
  height: var(--track-height);
  cursor: pointer;
  animate: 0.2s;
  background: var(--track-background);
  border-radius: var(--track-radius);
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #50555c;
}
input[type="range"]::-moz-range-track {
  width: var(--track-width);
  height: var(--track-height);
  cursor: pointer;
  animate: 0.2s;
  background: var(--track-background);
  border-radius: var(--track-radius);
}
input[type="range"]::-ms-track {
  width: var(--track-width);
  height: var(--track-height);
  cursor: pointer;
  animate: 0.2s;
  background: var(--track-background);
  border-radius: var(--track-radius);
}
// MS Shenanigans
input[type="range"]::-ms-fill-lower {
  background: #50555c;
  border-radius: 20px;
}
input[type="range"]::-ms-fill-upper {
  background: #50555c;
  border-radius: 20px;
}

// Range Thumb
input[type="range"]::-webkit-slider-thumb {
  height: var(--thumb-height);
  width: var(--thumb-width);
  border-radius: var(--thumb-radius);
  background: var(--thumb-background);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: var(--thumb-margin-top);
}
input[type="range"]::-moz-range-thumb {
  height: var(--thumb-height);
  width: var(--thumb-width);
  border-radius: var(--thumb-radius);
  background: var(--thumb-background);
  cursor: pointer;
}
input[type="range"]::-ms-thumb {
  height: var(--thumb-height);
  width: var(--thumb-width);
  border-radius: var(--thumb-radius);
  background: var(--thumb-background);
  margin-top: 1px;
  cursor: pointer;
}
// MS Shenanigans
input[type="range"]:focus::-ms-fill-lower {
  background: #50555c;
}
input[type="range"]:focus::-ms-fill-upper {
  background: #50555c;
}
</style>
