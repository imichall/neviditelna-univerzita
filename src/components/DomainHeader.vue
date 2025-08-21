<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4 transition-colors duration-200">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold text-gray-800 dark:text-gray-200">{{ domain.fqdn }}</h1>
      <div class="flex items-center space-x-2">
        <label class="inline-flex items-center cursor-pointer">
          <input v-model="verboseMode" type="checkbox" class="sr-only" />
          <div class="relative">
            <div
              class="w-10 h-6 bg-gray-200 rounded-full shadow-inner transition-colors duration-200"
              :class="verboseMode ? 'bg-green-500' : 'bg-gray-200'"
            ></div>
            <div
              class="absolute w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 top-1"
              :class="verboseMode ? 'transform translate-x-5' : 'transform translate-x-1'"
            ></div>
          </div>
          <span class="ml-3 text-sm text-gray-600 dark:text-gray-400">Verbose view</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DomainData } from '@/types'

interface Props {
  domain: DomainData
}

defineProps<Props>()

const verboseMode = defineModel<boolean>('verboseMode', { required: true })
</script>
