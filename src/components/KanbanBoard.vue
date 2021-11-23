<script>
import { ref, computed } from "vue";
import draggable from "vuedraggable";

import { useLaneStore } from "@/store";
import { Ticket, Controls } from "@/components";

export default {
  name: "KanbanBoard",
  components: { draggable, Ticket, Controls },
  setup() {
    const dragging = ref(false);
    const details = ref("");
    const laneStore = useLaneStore();
    const dragOptions = computed(() => {
      return {
        group: "tickets",
        animation: 200,
        disabled: false,
        ghostClass: "ghost",
      };
    });
    const lanes = computed({
      get: () => laneStore.getLanes,
      set: value => {
        console.log(value);
        laneStore.updateLanes(value);
      },
    });
    const addTicket = lane => {
      laneStore.updateLanes({ lane, ticket: details.value });
    };
    return { lanes, dragging, dragOptions, details, addTicket };
  },
};
</script>

<template>
  <Controls />
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 grid-cols-1">
    <div
      v-for="lane in lanes"
      :key="lane.name"
      class="border border-gray-300 rounded-md bg-gray-50"
    >
      <div class="p-3 h-full">
        <draggable
          class="min-h-full"
          v-model="lane.tickets"
          :itemKey="lane.name"
          v-bind="dragOptions"
          @start="dragging = true"
          @end="dragging = false"
        >
          <template #header>
            <div
              class="
                flex
                items-center
                justify-between
                border-b border-gray-300
                px-2
                pb-2
                mb-2
                rounder-t-md
              "
            >
              <div class="text-lg font-semibold">
                {{ lane.name }}
              </div>
              <div class="flex items-center space-x-3">
                <button
                  v-if="lane.name == 'Done'"
                  class="text-blue-500 hover:text-blue-700 font-semibold text-sm"
                >
                  Clear All
                </button>
                <span class="block py-1 px-3 bg-gray-200 rounded-xl text-sm font-semibold">
                  {{ lane.tickets.length }}
                </span>
              </div>
            </div>
          </template>
          <template #item="{ element }">
            <Ticket :ticket="element" :dragging="dragging" />
          </template>
          <template #footer>
            <form
              class="flex flex-col border-t border-gray-300 pt-2 mt-2"
              @submit.prevent="addTicket(lane.name)"
            >
              <input v-model="details" type="text" class="my-1 rounded-md h-8" />
              <button class="text-white rounded py-1.5 bg-gray-900">Add</button>
            </form>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
