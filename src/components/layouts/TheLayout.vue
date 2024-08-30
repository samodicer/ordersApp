<template>
  <div class="w-full h-full flex">
    <!-- SIDEMENU-->
    <SideMenu />
    <!-- MAIN CONTENT-->
    <Card class="w-full">
      <template #content>
        <router-view />
      </template>
    </Card>
    <!-- MODALS-->
    <TheModal />
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import TheModal from './TheModal.vue';
import SideMenu from '@/components/SideMenu.vue';
</script>