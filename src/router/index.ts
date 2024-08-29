import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/components/TheLayout.vue'),
    name: 'Layout',
    redirect: '/orders',
    children: [
      {
        path: '/orders',
        component: () => import('@/views/OrdersView.vue'),
        name: 'Orders',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/profile',
        component: () => import('@/views/ProfileView.vue'),
        name: 'Profile',
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/LoginView.vue'),
    name: 'Login'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
