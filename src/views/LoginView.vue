<template>
  <div class="w-full flex justify-center mt-16">
    <Card class="w-full max-w-[500px]">
      <template #title>LOGIN</template>
      <template #content>
        <div class="flex flex-col gap-2">
          <InputText 
            v-model="email" 
            type="text" 
            placeholder="Email" 
          />
          <Password 
            v-model="password" 
            fluid 
            toggleMask 
            placeholder="Password" 
            :feedback="false"
            @keyup.enter="loginUser"
          />
          <Button @click="loginUser">Login</Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import router from '@/router';
import { ref } from 'vue';
import { apiGetUser, apiLoginUser } from '@/api/user';
import { useUserStore } from '@/stores/user';
import { useToast } from 'primevue/usetoast';

const userStore = useUserStore();
const toast = useToast();

const email = ref('');
const password = ref('');

// Login API call
const loginUser = () => { 
  apiLoginUser({ email: email.value, password: password.value }).then(() => {
    apiGetUser().then((response) => {
      userStore.user = response.data.data;
      router.push({ name: 'Orders' });
     })
  }).catch((err) => {
    toast.add({
      severity: 'error',
      summary: 'ERROR',
      detail: err.response.data.message, 
      life: 3000
    });
  });
}
</script>