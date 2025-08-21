import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useThemeStore } from '../stores/theme'

// Mock document for theme tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

describe('Theme Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Mock document.documentElement
    Object.defineProperty(document, 'documentElement', {
      value: {
        classList: {
          add: () => {},
          remove: () => {},
        },
      },
      writable: true,
    })
  })

  it('initializes with light mode by default', () => {
    const themeStore = useThemeStore()
    expect(themeStore.isDarkMode).toBe(false)
  })

  it('toggles theme correctly', () => {
    const themeStore = useThemeStore()

    const initialMode = themeStore.isDarkMode
    themeStore.toggleTheme()

    expect(themeStore.isDarkMode).toBe(!initialMode)
  })

  it('toggles theme multiple times', () => {
    const themeStore = useThemeStore()

    const initialMode = themeStore.isDarkMode

    themeStore.toggleTheme()
    expect(themeStore.isDarkMode).toBe(!initialMode)

    themeStore.toggleTheme()
    expect(themeStore.isDarkMode).toBe(initialMode)
  })
})
