<script setup>
import Navbar from './components/Navbar.vue';

import Footer from './components/Footer.vue';
import router from './router';
</script>

<template>
  <Navbar />
  <router-view />
  <TasksPage />
  <Footer />
</template>

<style scoped></style>
