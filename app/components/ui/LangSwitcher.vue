<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
type LocaleCode = 'fr' | 'en' | 'de'

const availableLocales = computed(() => locales.value.map(item => (typeof item === 'string' ? { code: item, name: item } : item)))

const handleLocaleChange = (event: Event) => {
  setLocale((event.target as HTMLSelectElement).value as LocaleCode)
}
</script>

<template>
  <label class="sr-only" for="locale-select">Langue</label>
  <select
    id="locale-select"
    class="h-10 rounded-md border border-black/10 bg-white px-2 text-xs font-bold uppercase text-rally-ink dark:border-white/15 dark:bg-rally-asphalt dark:text-white"
    :value="locale"
    @change="handleLocaleChange"
  >
    <option v-for="item in availableLocales" :key="item.code" :value="item.code">
      {{ item.code }}
    </option>
  </select>
</template>
