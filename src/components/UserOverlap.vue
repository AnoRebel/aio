<script>
import { AppLink } from "@/components";

export default {
  components: { AppLink },
  props: {
    users: { type: Array, required: true },
    image: { type: Boolean, default: false },
  },
  setup() {
    const profColor = color => `bg-${color}-500`;
    return { profColor };
  },
};
</script>

<template>
  <div v-if="image" class="flex items-center justify-end space-x-5">
    <div class="flex items-center -space-x-1">
      <template v-for="(user, index) in users" :key="index">
        <app-link
          to="#"
          class="
            flex
            items-center
            justify-center
            text-white text-sm
            font-semibold
            rounded-full
            ring-2 ring-gray-500
          "
          :class="profColor(user.color)"
        >
          <img class="h-8 w-8 rounded-full object-cover" :src="user.image" :alt="user.alt" />
        </app-link>
      </template>
    </div>
  </div>
  <div v-else class="flex items-center justify-end space-x-5">
    <div class="flex items-center -space-x-1">
      <template v-for="(user, index) in users" :key="index">
        <app-link
          to="#"
          class="
            flex
            items-center
            justify-center
            text-white text-sm
            font-semibold
            w-8
            h-8
            rounded-full
            ring-2 ring-gray-500
          "
          :class="profColor(user.color)"
        >
          {{ user.initial }}
        </app-link>
      </template>
    </div>
  </div>
</template>
