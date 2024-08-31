<template>
  <div class="flex flex-col">
    <span class="text-3xl text-center mb-16">Profile</span>
    <div v-if="userStore.user" class="flex flex-col gap-4 items-center">
      <Avatar 
        style="background-color: #ece9fc; color: #2a1261" 
        shape="circle"
        size="xlarge"
        :label="!userStore.user.avatar ? getInitials(userStore.user.fullName) : undefined"
        :image="userStore.user.avatar ? `${API}/${userStore.user.avatar.image}` : undefined"
      />
      <span class="text-3xl">{{ userStore.user.fullName }}</span>
      <Button 
        icon="pi pi-pencil"
        label="Update profile"
        rounded
        @click="openProfileModal(userStore.user)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import ProfileModal from "@/components/modals/ProfileModal.vue";
import { useUserStore } from "@/stores/user";
import { getInitials } from "@/utils/user";
import { API } from "@/api/api";
import type { User } from "@/types/user";
import { useModalStore } from "@/stores/modal";

const userStore = useUserStore();
const modalStore = useModalStore();

const openProfileModal = (item: User) => {
  modalStore.open({
    component: ProfileModal,
    props: {
      title: 'Update profile',
      user: item,
    }
  })
}
</script>
