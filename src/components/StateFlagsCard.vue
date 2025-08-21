<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4 transition-colors duration-200">
    <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
      <i class="pi pi-flag text-red-500"></i>
      <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200">State flags</h3>
    </div>

    <!-- Brief mode - only active flags -->
    <div v-if="!verboseMode" class="space-y-4">
      <div v-for="group in groupedStateFlags" :key="group.id" class="space-y-2">
        <template v-if="group.flags.some(f => f?.active)">
          <h4 class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">{{ group.name }}</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div v-for="flag in group.flags.filter(f => f?.active)" :key="flag?.name" class="flex items-center space-x-3 text-sm p-2 bg-green-50 dark:bg-green-900/30 rounded-md border border-green-200 dark:border-green-700">
              <i class="pi pi-check text-green-600 dark:text-green-400 text-sm flex-shrink-0"></i>
              <span class="text-gray-800 dark:text-gray-200 truncate">{{ flag?.description }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Verbose mode - all flags grouped -->
    <div v-else class="space-y-4">
      <div v-for="group in groupedStateFlags" :key="group.id" class="space-y-2">
        <h4 class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">{{ group.name }}</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div v-for="flag in group.flags" :key="flag?.name" class="flex items-center space-x-3 text-sm p-2 rounded-md border" :class="flag?.active ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700' : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700'">
            <i :class="flag?.active ? 'pi pi-check text-green-600 dark:text-green-400' : 'pi pi-times text-red-500 dark:text-red-400'" class="text-sm flex-shrink-0"></i>
            <span :class="flag?.active ? 'text-gray-800 dark:text-gray-200' : 'text-red-700 dark:text-red-400'" class="truncate">{{ flag?.description }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface StateFlag {
  name: string
  description: string
  active: boolean
}

interface StateFlags {
  flags: StateFlag[]
  groups: string[][]
}

interface Props {
  stateFlags: StateFlags
  verboseMode: boolean
}

const props = defineProps<Props>()

// State flags grouped by groups from data
const groupedStateFlags = computed(() => {
  const groups = props.stateFlags.groups || []
  const allFlags = props.stateFlags.flags

  // Create groups based on the definition in data
  const result = groups.map((groupNames, index) => {
    const groupFlags = groupNames.map(flagName =>
      allFlags.find(flag => flag.name === flagName)
    ).filter((flag): flag is NonNullable<typeof flag> => Boolean(flag))

    return {
      id: index,
      name: getGroupName(index),
      flags: groupFlags.sort((a, b) => {
        // Active first
        if (a.active && !b.active) return -1
        if (!a.active && b.active) return 1
        return a.description.localeCompare(b.description)
      })
    }
  })

  // Add remaining flags that are not in any group
  const usedFlagNames = new Set(groups.flat())
  const ungroupedFlags = allFlags.filter(flag => !usedFlagNames.has(flag.name))

  if (ungroupedFlags.length > 0) {
    result.push({
      id: groups.length,
      name: 'Other',
      flags: ungroupedFlags.sort((a, b) => {
        if (a.active && !b.active) return -1
        if (!a.active && b.active) return 1
        return a.description.localeCompare(b.description)
      })
    })
  }

  return result
})

// Group name based on index
function getGroupName(index: number): string {
  const names = ['Security Restrictions', 'Zone Management']
  return names[index] || `Group ${index + 1}`
}
</script>
