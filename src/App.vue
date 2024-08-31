<template>
  <router-view />
  <!-- MODALS -->
  <TheModal />
  <!-- TOASTS -->
  <Toast position="bottom-right"/>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import TheModal from '@/components/TheModal.vue';

document.title = 'Orders App'
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