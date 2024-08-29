import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const loggedIn = computed(() => {
    return !!user.value
  })

  return { user, loggedIn }
})
