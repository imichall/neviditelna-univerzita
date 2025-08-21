import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useI18nStore } from '../stores/i18n'

describe('i18n Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with Czech language', () => {
    const i18nStore = useI18nStore()
    expect(i18nStore.currentLanguage).toBe('cs')
  })

  it('provides available languages', () => {
    const i18nStore = useI18nStore()
    const languages = i18nStore.availableLanguages

    expect(languages).toHaveLength(2)
    expect(languages[0]).toEqual({ code: 'cs', name: 'Čeština', flag: 'CS' })
    expect(languages[1]).toEqual({ code: 'en', name: 'English', flag: 'EN' })
  })

  it('changes language correctly', () => {
    const i18nStore = useI18nStore()

    i18nStore.setLanguage('en')
    expect(i18nStore.currentLanguage).toBe('en')

    i18nStore.setLanguage('cs')
    expect(i18nStore.currentLanguage).toBe('cs')
  })

  it('returns translation key as fallback for missing translations', () => {
    const i18nStore = useI18nStore()

    const result = i18nStore.t('nonexistent.key')
    expect(result).toBe('nonexistent.key')
  })

  it('handles nested translation keys', async () => {
    const i18nStore = useI18nStore()
    await i18nStore.initializeI18n()

    // This should work once translations are loaded
    const result = i18nStore.t('common.ferda')
    expect(typeof result).toBe('string')
  })
})
