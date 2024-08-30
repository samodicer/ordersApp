<template>
  <Dialog 
    visible 
    modal 
    :header="props.title" 
    :style="{ width: '30rem' }" 
    @update:visible="$event ? undefined : emit('close')"
  >
    <div class="flex flex-col mb-2">
      <label for="name" class="font-semibold">Name</label>
      <InputText 
        v-model="name" 
        id="name" 
        class="flex-auto" 
        autocomplete="off" 
        placeholder="Name"
      />
    </div>
    <div class="flex justify-end gap-2 mt-8">
      <Button 
        type="button" 
        label="Cancel" 
        severity="secondary" 
        @click="emit('close')"
      />
      <Button 
        type="button" 
        :label="props.variant === ModalVariant.CREATE ? 'Create' : 'Update'" 
        @click="confirmModal"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import { ModalVariant } from '@/types/modal';
import { apiCreateCategory, apiUpdateCategory } from '@/api/category';
import type { Category } from '@/types/category';

const props = defineProps<{
  variant: ModalVariant;
  title: string;
  successCallback: Function;
  category?: Category;
}>()

const emit = defineEmits<{
  (e: 'close'): void;
}>()

const name = ref(props.category ? props.category.name : '');

const createCategory = () => { 
  const data = {
    name: name.value,
  }

  apiCreateCategory(data).then(() => { 
    emit('close');
    props.successCallback();
  })
}

const updateCategory = () => { 
  if (!props.category) { 
    return;
  }

  const data = {
    name: name.value,
  }

  apiUpdateCategory(props.category.id, data).then(() => { 
    emit('close');
    props.successCallback();
  })
}

const confirmModal = () => {
  if (props.variant === ModalVariant.CREATE) { 
    createCategory();
    return;
  }
  updateCategory();
}
</script>
