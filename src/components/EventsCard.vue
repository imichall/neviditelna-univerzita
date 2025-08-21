<template>
  <div class="bg-white rounded-lg shadow-sm p-4">
    <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100">
      <i class="pi pi-clock text-purple-500"></i>
      <h3 class="text-sm font-semibold text-gray-800">Events</h3>
    </div>

    <div class="text-sm">
      <div class="grid grid-cols-3 gap-4 py-1">
        <div class="font-medium text-gray-700">Create date:</div>
        <div>{{ formatDate(events.registered.timestamp) }}</div>
        <div class="text-blue-600">{{ events.registered.registrar_handle }}</div>
      </div>
      <div class="grid grid-cols-3 gap-4 py-1">
        <div class="font-medium text-gray-700">Update date:</div>
        <div>{{ formatDate(events.updated.timestamp) }}</div>
        <div class="text-blue-600">{{ events.updated.registrar_handle }}</div>
      </div>
      <div class="grid grid-cols-3 gap-4 py-1">
        <div class="font-medium text-gray-700">Transfer date:</div>
        <div>{{ formatDate(events.transferred.timestamp) }}</div>
        <div class="text-blue-600">{{ events.transferred.registrar_handle }}</div>
      </div>
      <div class="grid grid-cols-3 gap-4 py-1">
        <div class="font-medium text-gray-700">Delete date:</div>
        <div>-</div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
