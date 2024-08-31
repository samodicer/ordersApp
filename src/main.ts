import './style.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from '@/stores/user'
import { apiGetUser } from '@/api/user'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import App from '@/App.vue'
import router from '@/router'
import Cookies from 'js-cookie'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastService)

/* ROUTER GUARD */
router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // If there is no user in store and token is set in Cookies
    // Get and store user
    if (!userStore.user && Cookies.get('XSRF-TOKEN')) {
      await apiGetUser()
        .then((response) => {
          userStore.user = response.data.data
        })
        .catch(() => {
          next({ name: 'Login' })
        })
    }
    // This route requires auth, check if logged in
    // If not, redirect to login page
    if (!userStore.loggedIn) {
      next({ name: 'Login' })
    } else {
      next() // Continue
    }
  } else {
    next() // Does not require auth
  }
})

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.mount('#app')
