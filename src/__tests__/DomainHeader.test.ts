import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import DomainHeader from '../components/DomainHeader.vue'
import type { DomainData } from '../types'

// Mock domain data
const mockDomain: DomainData = {
  fqdn: 'neviditelna-univerzita.cz',
  expires_at: '2025-01-15T01:00:00Z',
  owner: {
    handle: 'ARCIKANCLER',
    organization: 'Neviditelná univerzita',
    name: 'Vzorník Výsměšek',
  },
  administrative_contacts: [],
  events: {
    registered: { timestamp: '2002-01-14T03:56:00Z', registrar_handle: 'REG-CZNIC' },
    updated: { timestamp: '2016-12-27T03:12:00Z', registrar_handle: 'REG-GENREG' },
    transferred: { timestamp: '2010-06-10T12:49:00Z', registrar_handle: 'REG-GENREG' },
  },
  state_flags: {
    flags: [],
    groups: [],
  },
  nsset: {
    handle: 'NSSET-ARCIKANCLER',
    registrar: 'REG-GENREG',
    dns: [],
  },
  keyset: {
    handle: 'KEYSET-ARCIKANCLER',
    registrar: 'REG-GENREG',
    dns_keys: [],
  },
}

describe('DomainHeader', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders domain name correctly', () => {
    const wrapper = mount(DomainHeader, {
      props: {
        domain: mockDomain,
        'verbose-mode': false,
      },
    })

    expect(wrapper.text()).toContain('neviditelna-univerzita.cz')
  })

  it('shows verbose toggle switch', () => {
    const wrapper = mount(DomainHeader, {
      props: {
        domain: mockDomain,
        'verbose-mode': false,
      },
    })

    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('emits verbose mode changes', async () => {
    const wrapper = mount(DomainHeader, {
      props: {
        domain: mockDomain,
        'verbose-mode': false,
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.setValue(true)

    expect(wrapper.emitted()).toHaveProperty('update:verboseMode')
  })

  it('applies correct classes for verbose toggle', () => {
    const wrapper = mount(DomainHeader, {
      props: {
        domain: mockDomain,
        'verbose-mode': true,
      },
    })

    const toggleButton = wrapper.find('.transform')
    expect(toggleButton.classes()).toContain('translate-x-5')
  })
})
