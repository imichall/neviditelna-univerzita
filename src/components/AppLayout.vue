<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-blue-500 text-white">
      <div class="flex items-center justify-between px-4 py-2">
        <!-- Left side - Menu and Logo -->
        <div class="flex items-center space-x-3">
          <button @click="toggleSidebar" class="p-1 hover:bg-blue-600 rounded transition-colors">
            <i class="pi pi-bars text-lg"></i>
          </button>
          <h1 class="text-lg font-medium">Ferda</h1>
        </div>

        <!-- Right side - User menu -->
        <div class="relative user-menu">
          <button
            @click="showUserMenu = !showUserMenu"
            class="flex items-center space-x-2 px-3 py-1 hover:bg-blue-600 rounded text-sm"
          >
            <i class="pi pi-user"></i>
            <span>{{ authStore.currentUser?.name || 'User' }}</span>
          </button>

          <!-- User menu dropdown -->
          <div
            v-if="showUserMenu"
            class="absolute right-0 mt-1 w-48 bg-white rounded shadow-lg z-50"
          >
            <div class="py-1">
              <div class="px-3 py-2 text-sm text-gray-700 border-b">
                <div class="font-medium">{{ authStore.currentUser?.name }}</div>
                <div class="text-xs text-gray-500">{{ authStore.currentUser?.role }}</div>
              </div>
              <button
                @click="handleLogout"
                class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <i class="pi pi-sign-out"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content area -->
    <div class="flex">
      <!-- Sidebar -->
      <aside
        class="bg-white shadow-sm transition-all duration-300 ease-in-out overflow-hidden"
        :class="sidebarCollapsed ? 'w-16' : 'w-52'"
      >
        <div class="p-4">
          <!-- Section header -->
          <h2
            v-show="!sidebarCollapsed"
            class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 transition-opacity duration-200"
            :class="sidebarCollapsed ? 'opacity-0' : 'opacity-100'"
          >
            APPLICATIONS
          </h2>

          <!-- Navigation -->
          <nav>
            <div class="bg-yellow-400 text-black rounded flex items-center transition-all duration-200"
                 :class="sidebarCollapsed ? 'px-2 py-2 justify-center' : 'px-3 py-2 space-x-2'"
            >
              <i class="pi pi-globe text-sm flex-shrink-0"></i>
              <span
                v-show="!sidebarCollapsed"
                class="text-sm font-medium transition-opacity duration-200"
                :class="sidebarCollapsed ? 'opacity-0' : 'opacity-100'"
              >
                Registry
              </span>
            </div>
          </nav>
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 p-6 bg-gray-100">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const showUserMenu = ref(false)
const sidebarCollapsed = ref(false)

// Cookie helper functions
function setCookie(name: string, value: string, days: number = 30) {
  const expires = new Date()
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

function getCookie(name: string): string | null {
  const nameEQ = name + "="
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// Load sidebar state from cookie on mount (per user)
function loadSidebarState() {
  if (authStore.currentUser) {
    const cookieName = `sidebarCollapsed_${authStore.currentUser.username}`
    const savedState = getCookie(cookieName)
    if (savedState !== null) {
      sidebarCollapsed.value = savedState === 'true'
    }
  }
}

// Watch for sidebar changes and save to cookie (per user)
watch(sidebarCollapsed, (newValue) => {
  if (authStore.currentUser) {
    const cookieName = `sidebarCollapsed_${authStore.currentUser.username}`
    setCookie(cookieName, newValue.toString())
  }
})

// Watch for user changes and reload sidebar state
watch(() => authStore.currentUser, (newUser) => {
  if (newUser) {
    loadSidebarState()
  }
})

function handleLogout() {
  authStore.logout()
  router.push('/login')
}

function closeUserMenu(event: Event) {
  if (!(event.target as Element).closest('.user-menu')) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeUserMenu)
  loadSidebarState() // Load saved sidebar state
})

onUnmounted(() => {
  document.removeEventListener('click', closeUserMenu)
})
</script>
