<template>
  <div v-if="userStore.user" class="flex items-center justify-between gap-2 p-2">
    <div class="flex items-center gap-1 min-w-0">
      <Avatar 
        class="min-w-[32px]" 
        style="background-color: #ece9fc; color: #2a1261" 
        shape="circle" 
        :label="!userStore.user.avatar ? getInitials(userStore.user.fullName) : undefined"
        :image="userStore.user.avatar ? `${API}/${userStore.user.avatar.image}` : undefined"
      />
      <span class="truncate ...">{{ `${getInitials(userStore.user.firstname)}. ${userStore.user.lastname}` }}</span>
    </div>
    <Button
      class="min-w-[40px]"
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
import { getInitials } from "@/utils/user";
import { API } from "@/api/api";

const userStore = useUserStore();

const logoutUser = () => { 
  apiLogoutUser().then(() => {
    router.push({name: 'Login'})
  });
}
</script>