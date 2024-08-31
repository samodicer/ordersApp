<template>
  <div class="flex" style="min-height: calc(100vh - 32px);">
    <!-- SIDEMENU-->
    <SideMenu />
    <!-- MAIN CONTENT-->
    <Card class="w-full min-w-0">
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