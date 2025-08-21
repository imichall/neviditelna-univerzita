import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { DomainData } from '@/types'
import domainData from '@/data/domain-detail.json'

export const useDomainStore = defineStore('domain', () => {
  const domain = ref<DomainData>(domainData as DomainData)
  const verboseMode = ref(false)

  function toggleVerboseMode() {
    verboseMode.value = !verboseMode.value
  }

  return {
    domain,
    verboseMode,
    toggleVerboseMode,
  }
})
