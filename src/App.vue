<template>
  <router-view />
  <!-- MODALS -->
  <TheModal />
  <!-- TOASTS  -->
  <Toast />
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import TheModal from './components/layouts/TheModal.vue';

document.title = 'ordersApp'
</script>

<style>
html, body {
    height:100%;
} 
body {
  @apply bg-slate-100;
  margin: 1rem;
}
</style>