<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-colors duration-200">
    <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
      <i class="pi pi-user text-green-500"></i>
      <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200">Owner</h3>
    </div>
    <div class="space-y-2 text-sm">
      <div>
        <span class="font-medium text-gray-700 dark:text-gray-300">Handle:</span>
        <span class="ml-2 text-blue-600">{{ owner.handle }}</span>
      </div>
      <div class="flex items-center space-x-2">
        <i class="pi pi-eye text-green-500 text-sm"></i>
        <span class="font-medium text-gray-700 dark:text-gray-300">Organization:</span>
        <span class="ml-1 text-gray-900 dark:text-gray-100">{{ owner.organization }}</span>
      </div>
      <div class="flex items-center space-x-2">
        <i class="pi pi-eye text-green-500 text-sm"></i>
        <span class="font-medium text-gray-700 dark:text-gray-300">Name:</span>
        <span class="ml-1 text-gray-900 dark:text-gray-100">{{ owner.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Owner {
  handle: string
  organization: string
  name: string
}

interface Props {
  owner: Owner
}

defineProps<Props>()
</script>
