<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { BaseLayout, SideBarLayout, ChatLayout, GalleryLayout } from "@/layouts";
import { KanbanBoard, PrivateChat, GroupChat, MenuBar, VCodeMirror } from "@/components";
import { Splitpanes, Pane } from "splitpanes-esm";
import "splitpanes-esm/dist/splitpanes.css";

const log = data => console.log(data);
</script>

<template>
  <div class="h-full w-full">
    <splitpanes>
      <pane class="w-1/3">
        <div class="w-full bg-gray-900 border-right">
          <p>Navigation</p>
        </div>
      </pane>
      <pane class="w-2/3">
        <span>2</span>
      </pane>
    </splitpanes>
  </div>
  <VCodeMirror initialDoc="Hi there" :onChange="log" />
</template>

<style lang="scss">
.splitpanes--vertical > .splitpanes__splitter {
  min-width: 6px;
  background: linear-gradient(90deg, #ccc, #111);
}

.splitpanes--horizontal > .splitpanes__splitter {
  min-height: 6px;
  background: linear-gradient(0deg, #ccc, #111);
}
</style>
