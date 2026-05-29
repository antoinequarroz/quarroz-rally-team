<script setup lang="ts">
const year = new Date().getFullYear()
const localePath = useLocalePath()
</script>

<template>
  <footer class="footer-shell">
    <div class="section-container relative z-10 grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
      <div class="section-card p-5">
        <div class="flex items-center gap-3">
          <span class="grid size-10 place-items-center rounded-md bg-rally-red font-display text-sm font-bold text-white">RTQ</span>
          <span class="font-display text-lg font-bold text-white">Rallye Team Quarroz</span>
        </div>
        <p class="mt-4 max-w-md text-sm leading-6 text-white/65">
          Equipe valaisanne de rally. Passion, precision et partage avec les supporters, les sponsors et les amis du sport automobile.
        </p>
      </div>

      <div class="section-card p-5">
        <p class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-rally-red">Navigation</p>
        <div class="mt-4 grid gap-3 text-sm text-white/75">
          <NuxtLink :to="localePath('/calendrier')" class="hover:text-white">Calendrier</NuxtLink>
          <NuxtLink :to="localePath('/resultats')" class="hover:text-white">Resultats</NuxtLink>
          <NuxtLink :to="localePath('/sponsors')" class="hover:text-white">Sponsors</NuxtLink>
          <NuxtLink :to="localePath('/shop')" class="hover:text-white">Shop</NuxtLink>
        </div>
      </div>

      <div class="section-card p-5">
        <p class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-rally-red">Contact</p>
        <div class="mt-4 grid gap-3 text-sm text-white/75">
          <a href="mailto:contact@quarrozrallyteam.ch" class="hover:text-white">contact@quarrozrallyteam.ch</a>
          <span>Valais, Suisse</span>
          <NuxtLink :to="localePath('/contact')" class="hover:text-white">Devenir sponsor</NuxtLink>
        </div>
      </div>
    </div>
    <div class="relative z-10 border-t border-white/10 py-5">
      <div class="section-container text-xs text-white/50">
        © {{ year }} Rallye Team Quarroz. Tous droits reserves.
      </div>
    </div>
  </footer>
</template>
