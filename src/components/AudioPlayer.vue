<template>
  <div>
    <audio ref="playerRef" id="player" controls>
      <source :src="audio.src" :type=`audio/${audio.type}` />
    </audio>
  </div>
</template>

<script>
import { onMounted, ref, onBeforeUnmount } from "vue";
import Plyr from "plyr";
// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    // First get ahold of the legacy getUserMedia, if present
    const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    // Some browsers just don't implement it - return a rejected promise with an error
    // to keep a consistent interface
    if (!getUserMedia) {
      return Promise.reject(new Error("getUserMedia is not implemented in this browser"));
    }

    // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  };
}

export default {
  name: "AudioPlayer",
  props: {
    audio: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const playerRef = ref(null);
    const player = ref(null);
    onMounted(() => {
      player.value = new Plyr(playerRef.value, { title: props.title, muted: props.audio.muted });
    });

    onBeforeUnmount(() => {
      if (player.value != null) player.value.destroy();
    });
    return { playerRef };
  },
};
</script>

<style scoped lang="scss">
// @import "plyr/dist/plyr.css";
</style>
