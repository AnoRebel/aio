<template>
  <div class="fixed inset-0 w-full h-full flex bg-blue-100 items-center justify-center">
    <div class="bg-white rounded-lg shadow p-4">
      <div class="font-thin px-2 pb-4 text-lg">Enter your pin code</div>
      <div class="flex">
        <template v-for="(l, i) in pinlength" :key="`codefield_${i}`">
          <input
            :autofocus="i == 0"
            :id="`codefield_${i}`"
            class="
              h-16
              w-12
              border
              mx-2
              rounded-lg
              flex
              items-center
              text-center
              font-thin
              text-3xl
            "
            value=""
            maxlength="1"
            max="9"
            min="0"
            inputmode="decimal"
            @keyup="stepForward(i)"
            @keydown.backspace="stepBack(i)"
            @focus="resetValue(i)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const pinlength = ref(4);
    const resetValue = i => {
      for (let x = 0; x < pinlength.value; x++) {
        if (x >= i) document.getElementById(`codefield_${x}`).value = "";
      }
    };
    const stepForward = i => {
      if (document.getElementById(`codefield_${i}`).value && i != pinlength.value - 1) {
        document.getElementById(`codefield_${i + 1}`).focus();
        document.getElementById(`codefield_${i + 1}`).value = "";
      }
      checkPin();
    };
    const stepBack = i => {
      if (document.getElementById(`codefield_${i - 1}`).value && i != 0) {
        document.getElementById(`codefield_${i - 1}`).focus();
        document.getElementById(`codefield_${i - 1}`).value = "";
      }
    };
    const checkPin = () => {
      let code = "";
      for (let i = 0; i < pinlength.value; i++) {
        code = code + document.getElementById(`codefield_${i}`).value;
      }
      if (code.length == pinlength.value) {
        validatePin(code);
      }
    };
    const validatePin = code => {
      // Check pin on server
      if (code == "1234") alert("success");
    };
    return { pinlength, resetValue, stepForward, stepBack };
  },
};
</script>
