<script>
import { ref, watch } from "vue";

export default {
  name: "MentionList",
  props: {
    items: {
      type: Array,
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },
  },

  setup(props) {
    const selectedIndex = ref(0);

    watch(
      () => props.items,
      () => {
        selectedIndex.value = 0;
      }
    );

    const onKeyDown = ({ event }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    };

    const upHandler = () => {
      selectedIndex.value = (selectedIndex.value + props.items.length - 1) % props.items.length;
    };

    const downHandler = () => {
      selectedIndex.value = (selectedIndex.value + 1) % props.items.length;
    };

    const enterHandler = () => {
      selectItem(selectedIndex.value);
    };

    const selectItem = index => {
      const item = props.items[index];

      if (item) {
        props.command({ id: item });
      }
    };

    return {
      selectedIndex,
      selectItem,
      onKeyDown,
    };
  },
};
</script>

<template>
  <div class="text-sm p-1 relative rounded bg-white text-black overflow-hidden shadow">
    <button
      class="block m-0 w-full text-left bg-transparent rounded border-1px border-transparent py-1 px-2 hover:bg-gray-100"
      :class="{ 'border-[#000]': index === selectedIndex }"
      v-for="(item, index) in items"
      :key="index"
      @click="selectItem(index)"
    >
      {{ item }}
    </button>
  </div>
</template>
