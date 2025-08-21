<template>
  <div class="bg-white rounded-lg shadow-sm p-4">
    <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100">
      <i class="pi pi-shield text-amber-500"></i>
      <h3 class="text-sm font-semibold text-gray-800">KeySet</h3>
    </div>
    <div class="space-y-2 text-sm">
      <div>
        <span class="font-medium">Handle:</span>
        <span class="ml-2 text-blue-600">{{ keyset.handle }}</span>
      </div>
      <div>
        <span class="font-medium">Registrar:</span>
        <span class="ml-2 text-blue-600">{{ keyset.registrar }}</span>
      </div>
      <div v-if="verboseMode">
        <span class="font-medium">DNS keys:</span>
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
  verboseMode: boolean
}

defineProps<Props>()
</script>
