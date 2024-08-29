<template>
  <div class="w-full h-full flex">
      <SideMenu/>
      <Card class="w-full">
        <template #content>
          <router-view />
        </template>
      </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import SideMenu from './SideMenu.vue';
</script>