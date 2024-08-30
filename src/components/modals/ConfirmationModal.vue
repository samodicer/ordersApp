<template>
  <Dialog 
    visible 
    modal 
    :header="props.title" 
    :style="{ width: '30rem' }" 
    @update:visible="$event ? undefined : emit('close')"
  >
    <span>{{ props.body }}</span>
    <div class="flex justify-end gap-2 mt-8">
      <Button 
        type="button" 
        label="Cancel" 
        severity="secondary" 
        @click="emit('close')"
      />
      <Button 
        type="button" 
        label="Cofirm"
        severity="danger" 
        @click="confirmModal"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const props = defineProps<{
  title: string;
  body: string;
  successCallback: Function;
}>()

const emit = defineEmits<{
  (e: 'close'): void;
}>()

const confirmModal = () => {
  emit('close');
  props.successCallback();
}
</script>