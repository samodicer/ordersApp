<template>
  <Dialog 
    visible 
    modal 
    :header="props.title" 
    :style="{ width: '30rem' }" 
    @update:visible="$event ? undefined : emit('close')"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">Username</label>
      <InputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="email" class="font-semibold w-24">Email</label>
      <InputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <p>{{ props.title }}</p>
    <p>{{ props.body }}</p>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="emit('close')"></Button>
      <Button type="button" label="Save" @click="emit('close')"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';


const props = defineProps<{
  title: string
  body: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>
