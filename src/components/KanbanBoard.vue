<script>
import { ref, computed } from "vue";
import draggable from "vuedraggable";

import { Ticket, Controls } from "@/components";

export default {
  name: "KanbanBoard",
  components: { draggable, Ticket, Controls },
  setup() {
    const dragging = ref(false);
    const lanes = ref([
      {
        name: "To Do",
        tickets: [
          {
            title:
              "We don't have a brig. Meh. Calculon is gonna kill us and it's all everybody else's fault!",
            author: "Philip J. Fry",
            created_at: "16 hours ago",
            level: "Medium Level",
            comments_count: 12,
          },
          {
            title:
              "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
            author: "Turanga Leela",
            created_at: "16 hours ago",
            level: "High Level",
            comments_count: 1,
          },
          {
            title:
              "Stop it, stop it. It's fine. I will 'destroy' you! I can explain. It's very valuable. ",
            author: "Bender Bending Rodriguez",
            created_at: "16 hours ago",
            level: "Low Level",
            comments_count: 12,
          },
          {
            title:
              "Hey, whatcha watching? Hey! I'm a porno-dealing monster, what do I care what you think? It must be wonderful.",
            author: "Professor Farnsworth",
            created_at: "16 hours ago",
            level: "Medium Level",
            comments_count: 0,
          },
          {
            title:
              "A superpowers drug you can just rub onto your skin? You'd think it would be something you'd have to freebase.",
            author: "Amy Wong",
            created_at: "16 hours ago",
            level: "High Level",
            comments_count: 56,
          },
          {
            title:
              "Robot 1-X, save my friends! And Zoidberg! Perhaps, but perhaps your civilization is merely the sewer of an even greater society above you!",
            author: "Hermes Conrad",
            created_at: "16 hours ago",
            level: "Medium Level",
            comments_count: 10,
          },
          {
            title:
              "You are the last hope of the universe. Stop! Don't shoot fire stick in space canoe!",
            author: "Dr. John A. Zoidberg",
            created_at: "16 hours ago",
            level: "Low Level",
            comments_count: 3,
          },
        ],
      },
      {
        name: "In Progress",
        tickets: [
          {
            title:
              "You are the last hope of the universe. Stop! Don't shoot fire stick in space canoe!",
            author: "Dr. John A. Zoidberg",
            created_at: "16 hours ago",
            level: "Low Level",
            comments_count: 12,
          },
          {
            title:
              "A superpowers drug you can just rub onto your skin? You'd think it would be something you'd have to freebase.",
            author: "Amy Wong",
            created_at: "16 hours ago",
            level: "High Level",
            comments_count: 2,
          },
          {
            title:
              "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
            author: "Turanga Leela",
            created_at: "16 hours ago",
            level: "High Level",
            comments_count: 12,
          },
        ],
      },
      {
        name: "Done",
        tickets: [
          {
            title:
              "Stop it, stop it. It's fine. I will 'destroy' you! I can explain. It's very valuable. ",
            author: "Bender Bending Rodriguez",
            created_at: "16 hours ago",
            level: "Low Level",
            comments_count: 12,
          },
          {
            title:
              "Hey, whatcha watching? Hey! I'm a porno-dealing monster, what do I care what you think? It must be wonderful.",
            author: "Professor Farnsworth",
            created_at: "16 hours ago",
            level: "Medium Level",
            comments_count: 0,
          },
          {
            title:
              "We don't have a brig. Meh. Calculon is gonna kill us and it's all everybody else's fault!",
            author: "Philip J. Fry",
            created_at: "16 hours ago",
            level: "Medium Level",
            comments_count: 12,
          },
          {
            title:
              "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
            author: "Turanga Leela",
            created_at: "16 hours ago",
            level: "High Level",
            comments_count: 1,
          },
        ],
      },
    ]);
    const dragOptions = computed(() => {
      return {
        group: "tickets",
        animation: 200,
        disabled: false,
        ghostClass: "ghost",
      };
    });
    return { lanes, dragging, dragOptions };
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
          :list="lane.tickets"
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
            <form class="flex flex-col border-t border-gray-300
                pt-2
                mt-2">
              <input type="text" class="my-1 rounded-md h-8" />
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
