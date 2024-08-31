<template>
  <!-- ACTIVE MODAL FROM STORE -->
  <Component
    v-if="activeModal"
    :is="activeModal.component"
    v-bind="activeModal.props"
    @close="modalStore.close"
  />
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modal';
import { storeToRefs } from 'pinia';

const modalStore = useModalStore()
const { activeModal } = storeToRefs(modalStore);
</script>