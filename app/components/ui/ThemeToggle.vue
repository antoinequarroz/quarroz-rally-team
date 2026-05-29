<script setup lang="ts">
const colorMode = useColorMode()
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const label = computed(() => {
  if (!mounted.value) {
    return 'T'
  }

  return colorMode.value === 'dark' ? 'D' : 'L'
})
</script>

<template>
  <button
    class="grid size-10 place-items-center rounded-md border border-black/10 bg-white text-sm font-bold text-rally-ink transition hover:border-rally-red dark:border-white/15 dark:bg-rally-asphalt dark:text-white"
    type="button"
    aria-label="Changer le theme"
    @click="toggleTheme"
  >
    {{ label }}
  </button>
</template>
