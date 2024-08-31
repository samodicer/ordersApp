import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/components/layouts/TheLayout.vue'),
    name: 'Layout',
    redirect: '/orders',
    children: [
      {
        path: '/profile',
        component: () => import('@/views/ProfileView.vue'),
        name: 'Profile',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/orders',
        component: () => import('@/views/OrdersView.vue'),
        name: 'Orders',
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/order/:id/items',
        component: () => import('@/views/OrderItemsView.vue'),
        name: 'OrderItems',
        props: true,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/categories',
        component: () => import('@/views/CategoriesView.vue'),
        name: 'Categories',
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
