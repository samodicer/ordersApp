<template>
  <div class="flex flex-col">
    <span class="text-3xl text-center mb-16">Profile</span>
    <div v-if="userStore.user" class="flex flex-col gap-4 items-center">
      <Avatar 
        style="background-color: #ece9fc; 
        color: #2a1261" 
        shape="circle"
        size="xlarge"
      >
        <i v-if="!userStore.user.avatar" class="pi pi-question"></i>
      </Avatar>
      <span class="text-3xl">{{ userStore.user.fullName }}</span>
      <Button 
        icon="pi pi-upload"
        label="Upload avatar"
        rounded
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>
