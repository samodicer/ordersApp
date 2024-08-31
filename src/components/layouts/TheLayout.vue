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
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import SideMenu from '@/components/SideMenu.vue';
</script>