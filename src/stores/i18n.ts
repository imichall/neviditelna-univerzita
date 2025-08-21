import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

type Language = 'cs' | 'en'
type TranslationKey = string
type Translations = Record<TranslationKey, string>

export const useI18nStore = defineStore('i18n', () => {
  const currentLanguage = ref<Language>('cs')
  const translations = ref<Record<Language, Translations>>({
    cs: {},
    en: {},
  })

  // Cookie helper functions
  function setCookie(name: string, value: string, days: number = 30) {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  }

  function getCookie(name: string): string | null {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  // Load translations for a language
  async function loadTranslations(lang: Language) {
    try {
      const response = await import(`../locales/${lang}.json`)
      translations.value[lang] = response.default || response
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error)
    }
  }

  // Get current user for per-user language preference
  const authStore = useAuthStore()

  // Load language preference from cookie (per user)
  function loadLanguagePreference() {
    if (authStore.currentUser) {
      const cookieName = `language_${authStore.currentUser.username}`
      const savedLang = getCookie(cookieName)
      if (savedLang && (savedLang === 'cs' || savedLang === 'en')) {
        currentLanguage.value = savedLang
      }
    }
  }

  // Save language preference to cookie (per user)
  function saveLanguagePreference() {
    if (authStore.currentUser) {
      const cookieName = `language_${authStore.currentUser.username}`
      setCookie(cookieName, currentLanguage.value)
    }
  }

  // Change language
  function setLanguage(lang: Language) {
    currentLanguage.value = lang
    saveLanguagePreference()
  }

  // Get translation for a key (supports nested keys like "common.ferda")
  function t(key: TranslationKey): string {
    const keys = key.split('.')
    let translation: unknown = translations.value[currentLanguage.value]

    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = (translation as Record<string, unknown>)[k]
      } else {
        translation = undefined
        break
      }
    }

    if (!translation || typeof translation !== 'string') {
      console.warn(`Translation missing for key: ${key} in language: ${currentLanguage.value}`)
      return key // Return key as fallback
    }

    return translation
  }

  // Get available languages
  const availableLanguages = computed(() => [
    { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ])

  // Initialize i18n
  async function initializeI18n() {
    // Load both languages upfront
    await loadTranslations('cs')
    await loadTranslations('en')

    // Then load user preference
    loadLanguagePreference()
  }

  return {
    currentLanguage,
    availableLanguages,
    setLanguage,
    loadLanguagePreference,
    initializeI18n,
    t,
  }
})
