<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "@/components/HelloWorld.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import SideBarLayout from "@/layouts/SideBarLayout.vue";
</script>

<template>
  <SideBarLayout >
      <img alt="Vue logo" src="@/assets/logo.png" />
      <HelloWorld msg="Hello Vue 3 + Vite" />
  </SideBarLayout>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
