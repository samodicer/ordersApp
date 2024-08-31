<template>
  <Dialog 
    visible 
    modal 
    :header="props.title" 
    :style="{ width: '30rem' }" 
    @update:visible="$event ? undefined : emit('close')"
  >
    <span class="flex justify-center mb-4">
      Order number #{{ order.order_number }}
    </span>
    <Timeline :value="statusHistory">
      <template #opposite="slotProps">
        <small>
          {{ useDateFormat(slotProps.item.created_at, 'DD MMM YYYY HH:mm') }}
        </small>
      </template>
      <template #content="slotProps">
        <Tag 
          :style="{background: slotProps.item.status.color, color: 'white'}"
          :value="slotProps.item.status.name" 
        />
      </template>
      <template #marker>
        <i class="pi pi-arrow-right p-2"/>
      </template>
    </Timeline>
    <div class="flex justify-end mt-8">
      <Button 
        type="button" 
        label="Cancel" 
        severity="secondary" 
        @click="emit('close')"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';
import Timeline from 'primevue/timeline';
import type { Order } from '@/types/order';
import { apiGetStatusHistory } from '@/api/status';
import type { StatusHistory } from '@/types/status';
import { ref } from 'vue';
import { useDateFormat } from '@vueuse/core';

const props = defineProps<{
  title: string;
  order: Order;
}>()

const emit = defineEmits<{
  (e: 'close'): void;
}>()

const statusHistory = ref<StatusHistory[]>([])

const getStatusHistory = () => {
  apiGetStatusHistory(props.order.id).then((response) => {
    statusHistory.value = response.data.data.reverse();
  })
}

const onCreated = () => {
  getStatusHistory();
}

onCreated();
</script>