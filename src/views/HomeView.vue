<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { BaseLayout, SideBarLayout, ChatLayout, GalleryLayout } from "@/layouts";
import { KanbanBoard, PrivateChat, GroupChat } from "@/components";
</script>

<template>
  <div class="h-full w-full">
    <PrivateChat />
  </div>
</template>

<style></style>
