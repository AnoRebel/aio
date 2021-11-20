<script>
export default {
  name: "Ticket",
  props: {
    ticket: {
      type: Object,
      required: true,
    },
    dragging: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
};
</script>

<template>
  <div
    :class="[
      'relative p-3 mb-3 shadow border-t border-r border-l border-gray-100 rounded-md bg-green-400',
      dragging ? 'cursor-dragging' : 'hover:cursor-move',
    ]"
  >
    <span>{{ ticket.author }}</span>
  </div>
</template>
