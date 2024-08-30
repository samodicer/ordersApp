<template>
  <div class="flex">
    <!-- SIDEMENU-->
    <SideMenu class="min-h-lvh z-50" />
    <!-- MAIN CONTENT-->
    <Card class="flex-1 min-h-lvh min-w-0">
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