<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-colors duration-200">
    <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
      <i class="pi pi-clock text-purple-500"></i>
      <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200">{{ i18nStore.t('domain.events') }}</h3>
    </div>

    <div class="text-sm">
      <div class="grid grid-cols-3 gap-4 py-1">
        <div class="font-medium text-gray-700 dark:text-gray-300">{{ i18nStore.t('domain.createDate') }}</div>
        <div class="text-gray-900 dark:text-gray-100">{{ formatDate(events.registered.timestamp) }}</div>
        <div class="text-blue-600">{{ events.registered.registrar_handle }}</div>
      </div>
      <div class="grid grid-cols-3 gap-4 py-1">
        <div class="font-medium text-gray-700 dark:text-gray-300">{{ i18nStore.t('domain.updateDate') }}</div>
        <div class="text-gray-900 dark:text-gray-100">{{ formatDate(events.updated.timestamp) }}</div>
        <div class="text-blue-600">{{ events.updated.registrar_handle }}</div>
      </div>
      <div class="grid grid-cols-3 gap-4 py-1">
        <div class="font-medium text-gray-700 dark:text-gray-300">{{ i18nStore.t('domain.transferDate') }}</div>
        <div class="text-gray-900 dark:text-gray-100">{{ formatDate(events.transferred.timestamp) }}</div>
        <div class="text-blue-600">{{ events.transferred.registrar_handle }}</div>
      </div>
      <div class="grid grid-cols-3 gap-4 py-1">
        <div class="font-medium text-gray-700 dark:text-gray-300">{{ i18nStore.t('domain.deleteDate') }}</div>
        <div class="text-gray-900 dark:text-gray-100">-</div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18nStore } from '@/stores/i18n'

interface EventItem {
  timestamp: string
  registrar_handle: string
}

interface Events {
  registered: EventItem
  updated: EventItem
  transferred: EventItem
}

interface Props {
  events: Events
}

defineProps<Props>()

const i18nStore = useI18nStore()

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
