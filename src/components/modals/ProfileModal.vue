<template>
  <Dialog 
    visible 
    modal 
    :header="props.title" 
    :style="{ width: '30rem' }" 
    @update:visible="$event ? undefined : emit('close')"
  >
  <div class="flex flex-col mb-2">
      <label for="email" class="font-semibold">Email</label>
      <InputText 
        v-model="email" 
        id="email" 
        class="flex-auto" 
        autocomplete="off" 
        placeholder="Email"
      />
    </div>
    <div class="flex flex-col mb-2">
      <label for="firstname" class="font-semibold">First name</label>
      <InputText 
        v-model="firstname" 
        id="firstname" 
        class="flex-auto" 
        autocomplete="off" 
        placeholder="First name"
      />
    </div>
    <div class="flex flex-col mb-2">
      <label for="lastname" class="font-semibold">Last name</label>
      <InputText 
        v-model="lastname" 
        id="lastname" 
        class="flex-auto" 
        autocomplete="off" 
        placeholder="Last name"
      />
    </div>
    <div class="flex flex-col gap-6 mb-2">
      <div class="flex items-center gap-2">
        <label for="avatar" class="font-semibold">Avatar</label>
        <FileUpload 
          id="avatar" 
          mode="basic"
          customUpload 
          auto 
          accept="image/*" 
          severity="secondary" 
          class="p-button-outlined" 
          @select="onFileSelect"
        />
      </div>
      <div v-if="src" class="flex justify-center">
        <img 
          :src="src" 
          alt="Image preview" 
          class="shadow-md rounded-xl max-w-[200px] max-h-[200px]" 
        />
      </div>
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
        label="Update" 
        @click="confirmModal"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import FileUpload from 'primevue/fileupload';
import { ref } from 'vue';
import type { User } from '@/types/user';
import type { FileUploadSelectEvent } from 'primevue/fileupload';
import { apiUpdateUserProfile } from '@/api/user';
import { API } from '@/api/api';
import { useUserStore } from '@/stores/user';
import { useToast } from 'primevue/usetoast';

const props = defineProps<{
  title: string;
  user: User;
}>()

const emit = defineEmits<{
  (e: 'close'): void;
}>()

const userStore = useUserStore();
const toast = useToast();

const email = ref(props.user.email);
const firstname = ref(props.user.firstname);
const lastname = ref(props.user.lastname);
const file = ref<Blob | null>(null);

const src = ref(props.user.avatar ? `${API}/${props.user.avatar.image}` : '');

function onFileSelect(event: FileUploadSelectEvent) {
  file.value = event.files[0];
  if (file.value) {
    src.value = URL.createObjectURL(file.value);
  }
}

const updateProfile = () => { 
  const formData = new FormData();

  formData.append('email', email.value);
  formData.append('firstname', firstname.value);
  formData.append('lastname', lastname.value);

  if (file.value) {
    formData.append('avatar', file.value);
  }

  apiUpdateUserProfile(formData).then((response) => { 
    emit('close');
    userStore.user = response.data.data;
    toast.add({
      severity: 'success',
      summary: 'SUCCESS',
      detail: 'Your profile has been successfully updated.',
      life: 3000
    });
  }).catch((err) => { 
    toast.add({
      severity: 'error',
      summary: 'ERROR',
      detail: err.response.data.message,
      life: 3000
    });
  })
}

const confirmModal = () => {
  updateProfile();
}
</script>
