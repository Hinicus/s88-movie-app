<script setup>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";

import { useGlobalStore } from "./stores/global.js";
import { onBeforeMount } from "vue";
const { getUserDetails } = useGlobalStore();
onBeforeMount(() => {
  getUserDetails(localStorage.getItem("token"));
});
</script>

<template>
  <NavBar />
  <div class="app-shell">
    <main class="container" :class="{ 'center-view': $route.meta.center }">
      <router-view />
    </main>
  </div>
  <Footer />
</template>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}

.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main.container {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  box-sizing: border-box;
}

/* if the page is centered */
main.container.center-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
