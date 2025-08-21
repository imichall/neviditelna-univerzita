import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(false)

  // Cookie helper functions
  function setCookie(name: string, value: string, days: number = 30) {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  }

  function getCookie(name: string): string | null {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  // Get current user for per-user theme preference
  const authStore = useAuthStore()

  // Load theme from cookie on initialization (per user)
  function initializeTheme() {
    if (authStore.currentUser) {
      const cookieName = `theme_${authStore.currentUser.username}`
      const savedTheme = getCookie(cookieName)
      if (savedTheme) {
        isDarkMode.value = savedTheme === 'dark'
      } else {
        // Default to system preference
        isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
    } else {
      // Default to system preference when no user
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  // Load theme preference for current user
  function loadThemePreference() {
    initializeTheme()
  }

  // Apply theme to document
  function applyTheme() {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Toggle theme
  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value
  }

  // Watch for theme changes and save to cookie (per user)
  watch(isDarkMode, (newValue) => {
    if (authStore.currentUser) {
      const cookieName = `theme_${authStore.currentUser.username}`
      setCookie(cookieName, newValue ? 'dark' : 'light')
    }
    applyTheme()
  })

  // Initialize theme on store creation
  initializeTheme()

  return {
    isDarkMode,
    toggleTheme,
    loadThemePreference,
  }
})
