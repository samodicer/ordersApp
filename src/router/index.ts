import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import TheLayout from '@/components/TheLayout.vue'

const routes = [
  {
    path: '/',
    component: TheLayout,
    name: 'Layout',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: LoginView,
    name: 'Login'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
