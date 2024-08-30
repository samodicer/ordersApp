<template>
  <Menu v-if="!isMobile" class="h-full mr-2" :model="items">
    <template #start>
      <UserInfo />
    </template>
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </router-link>
    </template>
  </Menu>
  <div v-else class="fixed top-2 left-2">
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
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
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

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('md');

const menu = ref();

const items = ref([
{
    label: 'Profile',
    icon: 'pi pi-user',
    route: '/profile'
  },
  {
    label: 'Orders',
    icon: 'pi pi-receipt',
    route: '/orders'
  },
  {
    label: 'Categories',
    icon: 'pi pi-objects-column',
    route: '/categories'
  }
]);

const toggleMenu = (event: Event) => {
    menu.value.toggle(event);
};
</script>
