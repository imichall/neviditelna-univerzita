import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'
import usersData from '@/data/users.json'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null)
  const isAuthenticated = ref(false)

  function initializeAuth() {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      try {
        currentUser.value = JSON.parse(savedUser)
        isAuthenticated.value = true
      } catch (e) {
        console.error('Failed to parse saved user:', e)
        localStorage.removeItem('currentUser')
      }
    }
  }

  function login(username: string, password: string): boolean {
    const user = usersData.users.find((u) => u.username === username)
    if (user && password === 'password') {
      currentUser.value = user
      isAuthenticated.value = true
      localStorage.setItem('currentUser', JSON.stringify(user))
      return true
    }
    return false
  }

  function logout() {
    currentUser.value = null
    isAuthenticated.value = false
    localStorage.removeItem('currentUser')
  }

  initializeAuth()

  return {
    currentUser,
    isAuthenticated,
    login,
    logout,
  }
})
