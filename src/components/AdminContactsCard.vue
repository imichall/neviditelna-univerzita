<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-colors duration-200">
    <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
      <i class="pi pi-users text-indigo-500"></i>
      <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200">Administrative contacts</h3>
    </div>

    <!-- Brief mode - only handles -->
    <div v-if="!verboseMode" class="space-y-1 text-sm">
      <div>
        <span class="font-medium text-gray-700 dark:text-gray-300">Knihovník:</span>
        <span class="ml-2 text-blue-600">KNIHOVNÍK</span>
      </div>
      <div>
        <span class="font-medium text-gray-700 dark:text-gray-300">Mrakoplás:</span>
        <span class="ml-2 text-blue-600">MRAKOPLAS</span>
      </div>
    </div>

    <!-- Verbose mode - full details -->
    <div v-else class="space-y-4 text-sm">
      <div v-for="contact in administrativeContacts" :key="contact.handle" class="border-b border-gray-100 dark:border-gray-700 pb-3 last:border-b-0 last:pb-0">
        <div class="text-sm mb-2">
          <span class="font-medium text-gray-700 dark:text-gray-300">Handle:</span>
          <span class="ml-2 text-blue-600">{{ contact.handle }}</span>
        </div>
        <div class="flex items-center space-x-2 text-sm mb-1">
          <i :class="contact.publish.organization ? 'pi pi-eye text-green-500' : 'pi pi-eye-slash text-red-500'" class="text-sm"></i>
          <span class="font-medium text-gray-700 dark:text-gray-300">Organization:</span>
          <span class="ml-1">{{ contact.organization }}</span>
        </div>
        <div class="flex items-center space-x-2 text-sm">
          <i :class="contact.publish.name ? 'pi pi-eye text-green-500' : 'pi pi-eye-slash text-red-500'" class="text-sm"></i>
          <span class="font-medium text-gray-700 dark:text-gray-300">Name:</span>
          <span class="ml-1">{{ contact.name }}</span>
        </div>
      </div>
      <div class="border-t border-gray-100 dark:border-gray-700 pt-3 space-y-1 text-sm">
        <div>
          <span class="font-medium text-gray-700 dark:text-gray-300">Knihovník:</span>
          <span class="ml-2 text-blue-600">KNIHOVNÍK</span>
        </div>
        <div>
          <span class="font-medium text-gray-700 dark:text-gray-300">Mrakoplás:</span>
          <span class="ml-2 text-blue-600">MRAKOPLAS</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Contact {
  handle: string
  organization: string
  name: string
  publish: {
    organization: boolean
    name: boolean
  }
}

interface Props {
  administrativeContacts: Contact[]
  verboseMode: boolean
}

defineProps<Props>()
</script>
