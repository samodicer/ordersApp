<template>
  <div class="h-lvh p-4 bg-slate-100">
    <router-view />
  <!-- <p class="text-3xl text-red-800">TW</p>
  <Button v-if="!logged" label="Submit" @click="login">Login</Button>
  <Button label="Submit" @click="getStaff">Get</Button>
  <Button v-if="logged" label="Submit" @click="logout">Logout</Button> -->
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import { apiGetUser, apiLoginUser, apiLogoutUser } from './api/user';

const logged = ref(false)

// onMounted(async() => { 
//   await apiLoginUser({ email: "admin@a", password: "admin" });
//   apiGetUser();
//   apiGetOrder();
// })

const login = () => { 
  apiLoginUser({ email: "admin@a", password: "admin" }).then(() => {
    logged.value = true;
  });
}

const logout = () => { 
  apiLogoutUser().then(() => {
    logged.value = false;
  });
}


const getStaff = () => { 
  apiGetUser();
  apiGetOrder();
}
</script>