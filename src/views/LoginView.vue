<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 flex items-center justify-center p-4">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
    </div>

    <div class="relative bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <i class="pi pi-globe text-2xl text-white"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Ferda</h1>
        <p class="text-gray-600 text-sm">Domain Registry System</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="space-y-2">
          <label for="username" class="block text-sm font-semibold text-gray-700">
            <div class="flex items-center space-x-2">
              <i class="pi pi-user text-gray-500"></i>
              <span>Username</span>
            </div>
          </label>
          <div class="relative">
            <input
              id="username"
              v-model="username"
              type="text"
              required
              class="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              placeholder="Enter your username"
            />
            <i class="pi pi-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <div class="space-y-2">
          <label for="password" class="block text-sm font-semibold text-gray-700">
            <div class="flex items-center space-x-2">
              <i class="pi pi-lock text-gray-500"></i>
              <span>Password</span>
            </div>
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              placeholder="Enter your password"
            />
            <i class="pi pi-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center space-x-2">
          <i class="pi pi-exclamation-triangle text-red-500"></i>
          <span class="text-red-700 text-sm">{{ errorMessage }}</span>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          <span v-if="isLoading" class="animate-spin">
            <i class="pi pi-spinner text-sm"></i>
          </span>
          <i v-else class="pi pi-sign-in"></i>
          <span>{{ isLoading ? 'Přihlašování...' : 'Přihlásit se' }}</span>
        </button>
      </form>

      <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div class="flex items-center space-x-2 mb-2">
          <i class="pi pi-info-circle text-blue-500"></i>
          <span class="text-blue-800 font-semibold text-sm">Demo přístupy</span>
        </div>
        <div class="text-blue-700 text-xs space-y-1">
          <div><strong>Username:</strong> michal nebo jan</div>
          <div><strong>Password:</strong> password</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

async function handleLogin() {
  errorMessage.value = ''
  isLoading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (authStore.login(username.value, password.value)) {
      router.push('/')
    } else {
      errorMessage.value = 'Neplatné uživatelské jméno nebo heslo'
    }
  } finally {
    isLoading.value = false
  }
}
</script>
