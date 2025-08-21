import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AuthInfoCard from '../components/AuthInfoCard.vue'

describe('AuthInfoCard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  it('renders AuthInfo title', () => {
    const wrapper = mount(AuthInfoCard, {
      props: {
        expiresAt: '2025-01-15T01:00:00Z',
      },
    })

    // Should contain either translated text or translation key
    expect(wrapper.text()).toMatch(/AuthInfo|domain\.authInfo/)
  })

  it('shows SHOW button initially', () => {
    const wrapper = mount(AuthInfoCard, {
      props: {
        expiresAt: '2025-01-15T01:00:00Z',
      },
    })

    // Should contain either translated text or translation key
    expect(wrapper.find('button').text()).toMatch(/SHOW|common\.show/)
  })

  it('displays auth code after clicking SHOW', async () => {
    const wrapper = mount(AuthInfoCard, {
      props: {
        expiresAt: '2025-01-15T01:00:00Z',
      },
    })

    const showButton = wrapper.find('button')
    await showButton.trigger('click')

    expect(wrapper.text()).toContain('AX7K-9M2P-Q5R8-N3W6')
  })

  it('shows countdown timer after clicking SHOW', async () => {
    const wrapper = mount(AuthInfoCard, {
      props: {
        expiresAt: '2025-01-15T01:00:00Z',
      },
    })

    const showButton = wrapper.find('button')
    await showButton.trigger('click')

    // Should contain timer countdown (10 + translated seconds)
    expect(wrapper.text()).toMatch(/10.*s|10.*domain\.seconds/)
  })

  it('displays formatted expiration date', () => {
    const wrapper = mount(AuthInfoCard, {
      props: {
        expiresAt: '2025-01-15T01:00:00Z',
      },
    })

    expect(wrapper.text()).toContain('Jan 15, 2025')
  })

  it('hides auth code after timeout', async () => {
    const wrapper = mount(AuthInfoCard, {
      props: {
        expiresAt: '2025-01-15T01:00:00Z',
      },
    })

    const showButton = wrapper.find('button')
    await showButton.trigger('click')

    // Fast-forward time by 11 seconds
    vi.advanceTimersByTime(11000)
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).not.toContain('AX7K-9M2P-Q5R8-N3W6')
    expect(wrapper.find('button').text()).toMatch(/SHOW|common\.show/)
  })
})
