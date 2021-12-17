<script>
import { Draggable } from "vue3-smooth-dnd";
import { RefreshIcon } from "@heroicons/vue/outline";

export default {
  name: "TicketView",
  components: { Draggable, RefreshIcon },
  props: {
    ticket: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>

<template>
  <Draggable v-if="ticket">
    <div
      class="cursor-grab my-2 mx-4 rounded-md shadow-md bg-gray-100 dark:bg-gray-800 hover:border-2 border-purple-900"
    >
      <div
        v-if="ticket.loading"
        class="flex space-x-2 bg-gray-50 text-gray-900 dark:text-gray-200 dark:bg-gray-900 px-4 py-2 rounded-t-lg"
      >
        <RefreshIcon class="w-5 h-5 animate-spin" viewBox="0 0 24 24"></RefreshIcon>
        <span class="text-sm">Processing...</span>
      </div>
      <div class="p-2 space-y-2">
        <p class="text-sm">{{ ticket.data.author }}</p>
      </div>
    </div>
  </Draggable>
</template>

<style lang="scss" scoped>
.cursor-grab {
  cursor: -webkit-grab;
  cursor: grab;
}
.cursor-grabbing {
  cursor: -webkit-grabbing;
  cursor: grabbing;
}
// smooth-dnd-container.horizontal {
//   display: flex !important;
// }
</style>
