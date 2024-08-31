<template>
  <!--  DESKTOP MENU -->
  <Menu 
    v-if="!isMobile" 
    :model="items"
    class="mr-2 p-card" 
    style="height: calc(100vh - 32px);" 
  >
    <template #start>
      <UserInfo />
    </template>
    <template #item="{ item }">
      <router-link v-if="item.route" v-slot="{ navigate }" :to="item.route" custom>
        <div 
          class="p-2 cursor-pointer" 
          :class="{ 'bg-[#ecfdf5]': item.activeIn.includes(activeItem) }" 
          @click="navigate"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </div>
      </router-link>
    </template>
  </Menu>
  <!-- MOBILE MENU -->
  <div v-else class="fixed top-2 left-2 z-50">
      <Button
        icon="pi pi-ellipsis-v"
        rounded
        aria-haspopup="true" 
        aria-controls="overlay_menu"
        @click="toggleMenu"
      />
      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" >
        <template #start>
          <UserInfo />
        </template>
        <template #item="{ item }">
          <router-link v-if="item.route" v-slot="{ navigate }" :to="item.route" custom>
            <div 
              class="p-2 cursor-pointer" 
              :class="{ 'bg-[#ecfdf5]': item.activeIn.includes(activeItem) }" 
              @click="navigate"
            >
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </div>
          </router-link>
        </template>
      </Menu>
  </div>
</template>

<script setup lang="ts">
import Menu from "primevue/menu";
import Button from "primevue/button";
import UserInfo from "./UserInfo.vue";
import { ref } from "vue";
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useRoute } from "vue-router";

const route = useRoute();

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('md');

const menu = ref();
const activeItem = ref(route.name);

const items = ref([
{
    label: 'Profile',
    icon: 'pi pi-user',
    route: '/profile',
    activeIn: ['Profile'],
    command: () => {
      activeItem.value = "Profile"
    }
  },
  {
    label: 'Orders',
    icon: 'pi pi-receipt',
    route: '/orders',
    activeIn: ['Orders', 'OrderItems'],
    command: () => {
      activeItem.value = "Orders"
    }
  },
  {
    label: 'Categories',
    icon: 'pi pi-objects-column',
    route: '/categories',
    activeIn: ['Categories'],
    command: () => {
      activeItem.value = "Categories"
    }
  }
]);

const toggleMenu = (event: Event) => {
  menu.value.toggle(event);
};
</script>
