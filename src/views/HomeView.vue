<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { BaseLayout, SideBarLayout } from "@/layouts";
import { KanbanBoard } from "@/components";
</script>

<template>
  <SideBarLayout>
    <div class="w-full flex flex-col">
      <KanbanBoard />
    </div>
  </SideBarLayout>
</template>

<style></style>
