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
      'relative flex flex-col p-3 mb-3 shadow border-t border-r border-l border-gray-100 rounded-md bg-green-400',
      dragging ? 'cursor-dragging' : 'hover:cursor-move',
    ]"
  >
    <span>{{ ticket.level }}</span>
    <span>Comments: {{ ticket.comments_count }}</span>
    <span> - {{ ticket.author }} {{ ticket.created_at }}</span>
  </div>
</template>
