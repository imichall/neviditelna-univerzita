<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-colors duration-200">
    <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
      <i class="pi pi-key text-blue-500"></i>
      <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200">AuthInfo</h3>
    </div>

    <!-- AuthInfo section -->
    <div class="mb-4">
      <div v-if="!showAuthInfo">
        <button
          @click="showAuthCode"
          class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
        >
          SHOW
        </button>
      </div>
      <div v-else class="space-y-2">
        <!-- AuthInfo secret code -->
        <div class="bg-gray-100 dark:bg-gray-700 border dark:border-gray-600 rounded px-3 py-2 font-mono text-sm text-gray-800 dark:text-gray-200 select-all">
          {{ authInfoCode }}
        </div>
        <div class="space-y-1">
          <div class="text-xs text-gray-600 dark:text-gray-400">
            <span>Skryje se za {{ authInfoTimer }}s</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-1.5">
            <div
              class="bg-blue-500 h-1.5 rounded-full transition-all duration-1000 ease-linear"
              :style="{ width: `${(authInfoTimer / 10) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Expires at section -->
    <div class="pt-3 border-t border-gray-100 dark:border-gray-700">
      <div class="flex items-center space-x-2 mb-2">
        <i class="pi pi-calendar text-orange-500 text-sm"></i>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Expires at:</span>
      </div>
      <div class="text-sm text-gray-900 dark:text-gray-100 font-medium ml-6">
        {{ formatDate(expiresAt) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  expiresAt: string
}

defineProps<Props>()

const showAuthInfo = ref(false)
const authInfoTimer = ref(0)
const authInfoCode = ref('AX7K-9M2P-Q5R8-N3W6')

function showAuthCode() {
  showAuthInfo.value = true
  authInfoTimer.value = 10

  const interval = setInterval(() => {
    authInfoTimer.value--
    if (authInfoTimer.value <= 0) {
      clearInterval(interval)
      showAuthInfo.value = false
    }
  }, 1000)
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}
</script>
