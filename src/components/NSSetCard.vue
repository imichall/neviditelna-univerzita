<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-colors duration-200">
    <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
      <i class="pi pi-server text-teal-500"></i>
      <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200">NSSet</h3>
    </div>
    <div class="space-y-2 text-sm">
      <div>
        <span class="font-medium text-gray-700 dark:text-gray-300">Handle:</span>
        <span class="ml-2 text-blue-600">{{ nsset.handle }}</span>
      </div>
      <div>
        <span class="font-medium text-gray-700 dark:text-gray-300">Registrar:</span>
        <span class="ml-2 text-blue-600">{{ nsset.registrar }}</span>
      </div>
      <div>
        <span class="font-medium text-gray-700 dark:text-gray-300">DNS:</span>
        <div class="ml-4 mt-1 space-y-1 text-xs">
          <div v-for="dns in nsset.dns" :key="dns.name">
            {{ dns.name }} ({{ dns.ip_address }})
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface DNS {
  name: string
  ip_address: string
}

interface NSSet {
  handle: string
  registrar: string
  dns: DNS[]
}

interface Props {
  nsset: NSSet
}

defineProps<Props>()
</script>
