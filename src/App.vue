<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <Navbar />
  <router-view />
  <TasksPage />
  <Footer />
</template>

<style scoped></style>
