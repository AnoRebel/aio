<script>
import { ref } from "vue";

import { useLaneStore } from "@/store";
import { Container, Draggable } from "vue3-smooth-dnd";

import TicketView from "@/views/TicketView.vue";

export default {
  name: "KanbanScreen",
  components: { Container, Draggable, TicketView },
  setup() {
    const dragging = ref(false);
    const laneStore = useLaneStore();
    const details = ref([]);
    const lanes = ref({
      type: "container",
      props: {
        orientation: "horizontal",
      },
      children: laneStore.getAltLanes,
    });
    lanes.value.children.forEach(_ => {
      details.value.push({
        show: false,
        title: "",
        author: "",
        level: "",
        comments_count: "",
      });
    });
    const addTicket = (index, lane) => {
      laneStore.addAltTicket({ lane, ticket: details.value[index] });
      details.value[index].author = "";
      details.value[index].show = false;
    };
    const applyDrag = (arr, dragResult) => {
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let itemToAdd = payload;
      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;
    };
    const onLaneDrop = dropResult => {
      const board = Object.assign({}, lanes.value);
      board.children = applyDrag(board.children, dropResult);
      lanes.value = board;
    };
    const onTicketDrop = (laneId, dropResult) => {
      // check if element where ADDED or REMOVED in current lane
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const board = Object.assign({}, lanes.value);
        const lane = board.children.filter(p => p.id === laneId)[0];
        const laneIndex = board.children.indexOf(lane);
        const newLane = Object.assign({}, lane);
        // check if element was ADDED in current lane
        if (dropResult.removedIndex == null && dropResult.addedIndex >= 0) {
          // your action / api call
          dropResult.payload.loading = true;
          // simulate api call
          setTimeout(() => {
            dropResult.payload.loading = false;
          }, Math.random() * 5000 + 1000);
        }
        newLane.tickets = applyDrag(newLane.tickets, dropResult);
        board.children.splice(laneIndex, 1, newLane);
        lanes.value = board;
      }
    };
    const getTicketPayload = laneId => {
      return index => {
        return lanes.value.children.filter(p => p.id === laneId)[0].tickets[index];
      };
    };
    return { lanes, dragging, onLaneDrop, onTicketDrop, getTicketPayload, details, addTicket };
  },
};
</script>

<template>
  <Container
    class="h-full !flex space-x-6 overflow-x-auto p-8"
    group-name="lanes"
    tag="div"
    orientation="horizontal"
    :drop-placeholder="{
      className: `bg-purple-900/20 border-dotted border-2 border-purple-900 rounded-md mx-4 my-2`,
      animationDuration: '200',
      showOnTop: true,
    }"
    drag-class="bg-gray-700 rounded-md shadow-lg transition duration-100 ease-in z-50 transform scale-110"
    drop-class="transition duration-100 ease-in z-50 transform scale-90"
    @drop="onLaneDrop($event)"
    @drag-start="dragging = true"
    @drag-end="dragging = false"
  >
    <Draggable
      class="bg-gray-700 dark:bg-gray-200 rounded-md h-full w-96 flex-shrink-0 shadow-xl"
      v-for="(lane, index) in lanes.children"
      :key="lane.id"
    >
      <div class="h-full flex flex-col">
        <!-- header -->
        <div
          :class="[
            'rounded-t-lg p-4 space-x-4 bg-primary text-white flex space-x-2',
            dragging ? 'cursor-grabbing' : 'cursor-grab',
          ]"
        >
          <span class="text-lg border-b border-gray-200">{{ lane.name }}</span>
        </div>
        <!-- Lanes -->
        <Container
          class="flex-grow overflow-y-auto overflow-x-hidden"
          orientation="vertical"
          group-name="tickets"
          :shouldAcceptDrop="(e, payload) => e.groupName === 'tickets' && !payload.loading"
          :get-child-payload="getTicketPayload(lane.id)"
          :drop-placeholder="{
            className: `bg-purple-900/20 border-dotted border-2 border-purple-900 rounded-md mx-4 my-2`,
            animationDuration: '200',
            showOnTop: true,
          }"
          drag-class="bg-purple-900 dark:bg-purple-900 border-2 hover:border-purple-900 text-white transition duration-100 ease-in z-50 transform scale-110"
          drop-class="transition duration-100 ease-in z-50 transform scale-90"
          @drop="e => onTicketDrop(lane.id, e)"
        >
          <!-- Tickets -->
          <template v-for="ticket in lane.tickets" :key="ticket.id">
            <TicketView :ticket="ticket" />
          </template>
          <form
            v-if="details[index].show"
            class="w-full flex flex-col border-t border-gray-300 pt-2"
            @submit.prevent="addTicket(index, lane.name)"
          >
            <input v-model="details[index].author" type="text" class="my-1 rounded-md h-8" />
            <button class="text-white rounded py-1.5 bg-gray-900">Add</button>
          </form>
          <button
            v-else
            class="w-full text-white rounded-md shadow py-1.5 bg-green-800 hover:bg-green-700"
            @click="details[index].show = true"
          >
            Add Ticket
          </button>
        </Container>
      </div>
    </Draggable>
  </Container>
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
