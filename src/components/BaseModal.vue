<template>
  <div id="modal-template" class="container">
    <transition name="modal">
      <div class="modal-mask d-table position-fixed top-0 start-0 w-100 h-100">
        <div class="container mt-5">
          <vue-resizable
            ref="resizableComponent"
            class="resizable"
            drag-selector=".dragSelector"
            active="[]"
            width="auto"
            height="auto"
          >
            <div
              class="ms-xl-5 ms-lg-5 ms-md-4 col-xl-11 col-lg-11 col-md-11 col-sm-12 col-xs-12 rounded bg-white"
            >
              <div
                class="dragSelector rounded-top bg-dark d-flex align-items-center justify-content-between py-3 px-4"
              >
                <slot name="header">
                  <div></div>
                </slot>
                <button
                  class="custom-btn btn-close bg-light text-white float-end"
                  @click="$emit('close')"
                ></button>
              </div>
              <div class="my-2 mx-0 modal-body">
                <slot />
              </div>
              <div class="d-flex align-items-center py-1 px-2">
                <slot name="footer" />
              </div>
            </div>
          </vue-resizable>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { onMounted, ref, onBeforeMount } from "vue";
import VueResizable from "vue-resizable";

export default {
  name: "BaseModal",
  components: { VueResizable },
  props: {
    width: {
      type: String,
      default: "800px",
    },
  },
  emits: ["close"],
  setup(_, { emit }) {
    const dragging = ref(false);
    const escFunction = event => {
      if (event.keyCode === 27) {
        emit("close");
      }
    };

    onMounted(() => document.addEventListener("keydown", escFunction, false));
    onBeforeMount(() => document.removeEventListener("keydown", escFunction, false));

    return { dragging };
  },
};
</script>

<style scoped>
.cursor-dragging {
  cursor: grabbing;
}
.cursor-drag {
  cursor: grab;
}
.custom-btn {
  display: inline-block;
  text-align: center;
  text-decoration: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 0.25rem;
  -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;

  text-transform: uppercase;
  vertical-align: bottom;
  border: 0;
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 5px #0003, 0 2px 10px #0000001a;
  font-weight: 500;
  padding: 0.625rem 1.5rem 0.5rem;
  font-size: 0.75rem;
  line-height: 1.5;
}

#modal-template ::after {
  visibility: hidden;
}
.modal-mask {
  z-index: 1060;
  transition: opacity 0.3s ease;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
  /* width: 300px; 
  width: v-bind(width);
  */
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

/*
* Auto-applied to transition="modal"
*/
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
