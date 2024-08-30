<template>
  <div v-if="userStore.user" class="flex items-center justify-between p-2">
    <div class="flex items-center gap-2">
      <Avatar 
        class="mr-2" 
        style="background-color: #ece9fc; 
        color: #2a1261" 
        shape="circle" 
      >
        <i v-if="!userStore.user.avatar" class="pi pi-question"/>
      </Avatar>
      <span>{{ userStore.user.fullName }}</span>
    </div>
    <Button
      icon="pi pi-sign-out"
      rounded
      outlined
      @click="logoutUser"
    />
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import router from "@/router";
import { apiLogoutUser } from "@/api/user";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const logoutUser = () => { 
  apiLogoutUser().then(() => {
    router.push({path: '/login'})
  });
}
</script>