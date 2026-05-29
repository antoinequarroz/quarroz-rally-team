<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()
const isOpen = ref(false)

const navItems = [
  { label: 'Equipe', to: '/equipe' },
  { label: 'Calendrier', to: '/calendrier' },
  { label: 'Resultats', to: '/resultats' },
  { label: 'Sponsors', to: '/sponsors' },
  { label: 'Shop', to: '/shop' },
]

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  },
)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-rally-ink/90">
    <nav class="section-container flex h-16 items-center justify-between">
    <NuxtLink :to="localePath('/')" class="flex items-center gap-3" aria-label="Rallye Team Quarroz">
        <span class="grid size-10 place-items-center rounded-md bg-rally-red font-display text-sm font-bold text-white">
          RTQ
        </span>
        <span class="font-display text-base font-bold leading-none text-rally-ink dark:text-white">
          Rallye Team<br>
          Quarroz
        </span>
      </NuxtLink>

      <div class="hidden items-center gap-7 lg:flex">
        <NuxtLink v-for="item in navItems" :key="item.to" :to="localePath(item.to)" class="nav-link">
          {{ item.label }}
        </NuxtLink>
      </div>

      <div class="hidden items-center gap-2 lg:flex">
        <UiLangSwitcher />
        <UiThemeToggle />
        <NuxtLink :to="localePath('/contact')" class="btn-primary">
          Contact
        </NuxtLink>
      </div>

      <button
        class="grid size-10 place-items-center rounded-md border border-black/10 text-rally-ink dark:border-white/15 dark:text-white lg:hidden"
        type="button"
        :aria-expanded="isOpen"
        aria-controls="mobile-menu"
        @click="isOpen = !isOpen"
      >
        <span class="sr-only">Menu</span>
        <span class="text-xl leading-none">{{ isOpen ? 'x' : '=' }}</span>
      </button>
    </nav>

    <div v-if="isOpen" id="mobile-menu" class="border-t border-black/10 bg-white dark:border-white/10 dark:bg-rally-ink lg:hidden">
      <div class="section-container flex flex-col gap-4 py-5">
        <NuxtLink v-for="item in navItems" :key="item.to" :to="localePath(item.to)" class="nav-link">
          {{ item.label }}
        </NuxtLink>
        <div class="flex items-center gap-2 pt-2">
          <UiLangSwitcher />
          <UiThemeToggle />
        </div>
        <NuxtLink :to="localePath('/contact')" class="btn-primary">
          Contact
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
