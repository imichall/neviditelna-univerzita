<script setup lang="ts">
import { computed, ref } from 'vue'
import AppLayout from '@/components/AppLayout.vue'
import { useDomainStore } from '@/stores/domain'

const domainStore = useDomainStore()
const domain = computed(() => domainStore.domain)
const verboseMode = computed({
  get: () => domainStore.verboseMode,
  set: (value) => (domainStore.verboseMode = value)
})

const showAuthInfo = ref(false)
const authInfoTimer = ref(0)
const authInfoCode = ref('AX7K-9M2P-Q5R8-N3W6')

function showAuthCode() {
  showAuthInfo.value = true
  authInfoTimer.value = 10

  const interval = setInterval(() => {
    authInfoTimer.value--
    if (authInfoTimer.value <= 0) {
      clearInterval(interval)
      showAuthInfo.value = false
    }
  }, 1000)
}

const sortedStateFlags = computed(() => {
  const flagPriority: Record<string, number> = {
    'serverRenewProhibited': 1,
    'serverTransferProhibited': 2,
    'serverUpdateProhibited': 3,
    'serverDeleteProhibited': 4,
    'serverHold': 5,

    'clientRenewProhibited': 10,
    'clientTransferProhibited': 11,
    'clientUpdateProhibited': 12,
    'clientDeleteProhibited': 13,
    'clientHold': 14,

    'ok': 20,
    'inactive': 21,
    'pendingCreate': 22,
    'pendingUpdate': 23,
    'pendingTransfer': 24,
    'pendingDelete': 25
  }

  return [...domain.value.state_flags.flags].sort((a, b) => {
    if (a.active && !b.active) return -1
    if (!a.active && b.active) return 1

    const priorityA = flagPriority[a.name] || 999
    const priorityB = flagPriority[b.name] || 999
    if (priorityA !== priorityB) return priorityA - priorityB

    return a.description.localeCompare(b.description)
  })
})

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

<template>
  <AppLayout>
    <!-- Header card with domain name and toggle -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-800">{{ domain.fqdn }}</h1>
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
            <span class="ml-3 text-sm text-gray-600">Verbose view</span>
          </label>
        </div>
      </div>
    </div>

      <!-- Compact cards grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100">
          <i class="pi pi-key text-blue-500"></i>
          <h3 class="text-sm font-semibold text-gray-800">AuthInfo</h3>
        </div>

        <!-- AuthInfo section -->
        <div class="mb-4">
          <div v-if="!showAuthInfo">
            <button
              @click="showAuthCode"
              class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
            >
              SHOW
            </button>
          </div>
          <div v-else class="space-y-2">
            <!-- AuthInfo secret code -->
            <div class="bg-gray-100 border rounded px-3 py-2 font-mono text-sm text-gray-800 select-all">
              {{ authInfoCode }}
            </div>
            <div class="space-y-1">
              <div class="text-xs text-gray-600">
                <span>Skryje se za {{ authInfoTimer }}s</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  class="bg-blue-500 h-1.5 rounded-full transition-all duration-1000 ease-linear"
                  :style="{ width: `${(authInfoTimer / 10) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Expires at section -->
        <div class="pt-3 border-t border-gray-100">
          <div class="flex items-center space-x-2 mb-2">
            <i class="pi pi-calendar text-orange-500 text-sm"></i>
            <span class="text-sm font-medium text-gray-700">Expires at:</span>
          </div>
          <div class="text-sm text-gray-900 font-medium ml-6">
            {{ formatDate(domain.expires_at) }}
          </div>
        </div>
      </div>

      <!-- Owner card -->
      <div class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100">
          <i class="pi pi-user text-green-500"></i>
          <h3 class="text-sm font-semibold text-gray-800">Owner</h3>
        </div>
        <div class="space-y-2 text-sm">
          <div>
            <span class="font-medium">Handle:</span>
            <span class="ml-2 text-blue-600">{{ domain.owner.handle }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <i class="pi pi-eye text-green-500 text-sm"></i>
            <span class="font-medium">Organization:</span>
            <span class="ml-1">{{ domain.owner.organization }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <i class="pi pi-eye text-green-500 text-sm"></i>
            <span class="font-medium">Name:</span>
            <span class="ml-1">{{ domain.owner.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Events and Administrative contacts grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <div class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100">
          <i class="pi pi-clock text-purple-500"></i>
          <h3 class="text-sm font-semibold text-gray-800">Events</h3>
        </div>

        <div class="text-sm">
          <div class="grid grid-cols-3 gap-4 py-1">
            <div class="font-medium text-gray-700">Create date:</div>
            <div>{{ formatDate(domain.events.registered.timestamp) }}</div>
            <div class="text-blue-600">{{ domain.events.registered.registrar_handle }}</div>
          </div>
          <div class="grid grid-cols-3 gap-4 py-1">
            <div class="font-medium text-gray-700">Update date:</div>
            <div>{{ formatDate(domain.events.updated.timestamp) }}</div>
            <div class="text-blue-600">{{ domain.events.updated.registrar_handle }}</div>
          </div>
          <div class="grid grid-cols-3 gap-4 py-1">
            <div class="font-medium text-gray-700">Transfer date:</div>
            <div>{{ formatDate(domain.events.transferred.timestamp) }}</div>
            <div class="text-blue-600">{{ domain.events.transferred.registrar_handle }}</div>
          </div>
          <div class="grid grid-cols-3 gap-4 py-1">
            <div class="font-medium text-gray-700">Delete date:</div>
            <div>-</div>
            <div></div>
          </div>
        </div>
      </div>

      <!-- Administrative contacts card -->
      <div class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100">
          <i class="pi pi-users text-indigo-500"></i>
          <h3 class="text-sm font-semibold text-gray-800">Administrative contacts</h3>
        </div>

        <!-- Brief mode - only handles -->
        <div v-if="!verboseMode" class="space-y-1 text-sm">
          <div>
            <span class="font-medium">Knihovník:</span>
            <span class="ml-2 text-blue-600">KNIHOVNÍK</span>
          </div>
          <div>
            <span class="font-medium">Mrakoplás:</span>
            <span class="ml-2 text-blue-600">MRAKOPLAS</span>
          </div>
        </div>

        <!-- Verbose mode - full details -->
        <div v-else class="space-y-4 text-sm">
          <div v-for="contact in domain.administrative_contacts" :key="contact.handle" class="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
            <div class="text-sm mb-2">
              <span class="font-medium">Handle:</span>
              <span class="ml-2 text-blue-600">{{ contact.handle }}</span>
            </div>
            <div class="flex items-center space-x-2 text-sm mb-1">
              <i :class="contact.publish.organization ? 'pi pi-eye text-green-500' : 'pi pi-eye-slash text-red-500'" class="text-sm"></i>
              <span class="font-medium">Organization:</span>
              <span class="ml-1">{{ contact.organization }}</span>
            </div>
            <div class="flex items-center space-x-2 text-sm">
              <i :class="contact.publish.name ? 'pi pi-eye text-green-500' : 'pi pi-eye-slash text-red-500'" class="text-sm"></i>
              <span class="font-medium">Name:</span>
              <span class="ml-1">{{ contact.name }}</span>
            </div>
          </div>
          <div class="border-t border-gray-100 pt-3 space-y-1 text-sm">
            <div>
              <span class="font-medium">Knihovník:</span>
              <span class="ml-2 text-blue-600">KNIHOVNÍK</span>
            </div>
            <div>
              <span class="font-medium">Mrakoplás:</span>
              <span class="ml-2 text-blue-600">MRAKOPLAS</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- State flags card -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100">
        <i class="pi pi-flag text-red-500"></i>
        <h3 class="text-sm font-semibold text-gray-800">State flags</h3>
      </div>
      <div v-if="!verboseMode" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div v-for="flag in sortedStateFlags.filter(f => f.active)" :key="flag.name" class="flex items-center space-x-3 text-sm p-2 bg-green-50 rounded-md border border-green-200">
          <i class="pi pi-check text-green-600 text-sm flex-shrink-0"></i>
          <span class="text-gray-800 truncate">{{ flag.description }}</span>
        </div>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div v-for="flag in sortedStateFlags" :key="flag.name" class="flex items-center space-x-3 text-sm p-2 rounded-md border" :class="flag.active ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'">
          <i :class="flag.active ? 'pi pi-check text-green-600' : 'pi pi-times text-red-500'" class="text-sm flex-shrink-0"></i>
          <span :class="flag.active ? 'text-gray-800' : 'text-red-700'" class="truncate">{{ flag.description }}</span>
        </div>
      </div>
    </div>

    <!-- NSSet and KeySet cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100">
          <i class="pi pi-server text-teal-500"></i>
          <h3 class="text-sm font-semibold text-gray-800">NSSet</h3>
        </div>
        <div class="space-y-2 text-sm">
          <div>
            <span class="font-medium">Handle:</span>
            <span class="ml-2 text-blue-600">{{ domain.nsset.handle }}</span>
          </div>
          <div>
            <span class="font-medium">Registrar:</span>
            <span class="ml-2 text-blue-600">{{ domain.nsset.registrar }}</span>
          </div>
          <div v-if="verboseMode">
            <span class="font-medium">DNS:</span>
            <div class="ml-4 mt-1 space-y-1 text-xs">
              <div v-for="dns in domain.nsset.dns" :key="dns.name">
                {{ dns.name }} ({{ dns.ip_address }})
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- KeySet card -->
      <div class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100">
          <i class="pi pi-shield text-amber-500"></i>
          <h3 class="text-sm font-semibold text-gray-800">KeySet</h3>
        </div>
        <div class="space-y-2 text-sm">
          <div>
            <span class="font-medium">Handle:</span>
            <span class="ml-2 text-blue-600">{{ domain.keyset.handle }}</span>
          </div>
          <div>
            <span class="font-medium">Registrar:</span>
            <span class="ml-2 text-blue-600">{{ domain.keyset.registrar }}</span>
          </div>
          <div v-if="verboseMode">
            <span class="font-medium">DNS keys:</span>
            <div class="ml-4 mt-1 space-y-1 text-xs font-mono">
              <div v-for="key in domain.keyset.dns_keys" :key="key">
                {{ key }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
