<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-colors duration-200">
    <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
      <i class="pi pi-shield text-amber-500"></i>
      <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200">KeySet</h3>
    </div>
    <div class="space-y-2 text-sm">
      <div>
        <span class="font-medium text-gray-700 dark:text-gray-300">Handle:</span>
        <span class="ml-2 text-blue-600">{{ keyset.handle }}</span>
      </div>
      <div>
        <span class="font-medium text-gray-700 dark:text-gray-300">Registrar:</span>
        <span class="ml-2 text-blue-600">{{ keyset.registrar }}</span>
      </div>
      <div>
        <span class="font-medium text-gray-700 dark:text-gray-300">DNS keys:</span>
        <div class="ml-4 mt-1 space-y-1 text-xs font-mono">
          <div v-for="key in keyset.dns_keys" :key="key">
            {{ key }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface KeySet {
  handle: string
  registrar: string
  dns_keys: string[]
}

interface Props {
  keyset: KeySet
}

defineProps<Props>()
</script>
