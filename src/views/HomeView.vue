<script setup lang="ts">
import { computed } from 'vue'
import AppLayout from '@/components/AppLayout.vue'
import DomainHeader from '@/components/DomainHeader.vue'
import AuthInfoCard from '@/components/AuthInfoCard.vue'
import OwnerCard from '@/components/OwnerCard.vue'
import EventsCard from '@/components/EventsCard.vue'
import AdminContactsCard from '@/components/AdminContactsCard.vue'
import StateFlagsCard from '@/components/StateFlagsCard.vue'
import NSSetCard from '@/components/NSSetCard.vue'
import KeySetCard from '@/components/KeySetCard.vue'
import { useDomainStore } from '@/stores/domain'

const domainStore = useDomainStore()
const domain = computed(() => domainStore.domain)
const verboseMode = computed({
  get: () => domainStore.verboseMode,
  set: (value) => (domainStore.verboseMode = value)
})
</script>

<template>
  <AppLayout>
    <DomainHeader
      :domain="domain"
      v-model:verbose-mode="verboseMode"
    />

    <!-- Compact cards grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <!-- AuthInfo with Expires at -->
      <AuthInfoCard :expires-at="domain.expires_at" />

      <!-- Owner card -->
      <OwnerCard :owner="domain.owner" />
    </div>

    <!-- Events and Administrative contacts grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <!-- Events card -->
      <EventsCard :events="domain.events" />

      <!-- Administrative contacts card -->
      <AdminContactsCard
        :administrative-contacts="domain.administrative_contacts"
        :verbose-mode="verboseMode"
      />
    </div>

    <!-- State flags card with groups -->
    <StateFlagsCard
      :state-flags="domain.state_flags"
      :verbose-mode="verboseMode"
    />

    <!-- NSSet and KeySet cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- NSSet card -->
      <NSSetCard
        :nsset="domain.nsset"
        :verbose-mode="verboseMode"
      />

      <!-- KeySet card -->
      <KeySetCard
        :keyset="domain.keyset"
        :verbose-mode="verboseMode"
      />
    </div>
  </AppLayout>
</template>
