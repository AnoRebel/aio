<template>
  <div
    v-scroll-to="{
      el: 'body',
      container: 'body',
      duration: 300,
      easing: 'linear',
      offset: -200,
      force: true,
      cancelable: true,
      x: false,
      y: true,
    }"
    class="back-to-top d-flex align-items-center justify-content-center cursor-pointer"
    :class="{ active: active }"
  >
    <i class="bi bi-arrow-up-short"></i>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from "vue";

export default {
  name: "BaseScrollToTop",
  setup() {
    const active = ref(false);

    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        active.value = true;
      } else {
        active.value = false;
      }
    };

    onMounted(() => {
      window.addEventListener("load", toggleBacktotop);
      document.addEventListener("scroll", toggleBacktotop);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("load", toggleBacktotop);
      document.removeEventListener("scroll", toggleBacktotop);
    });

    return {
      active,
    };
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
