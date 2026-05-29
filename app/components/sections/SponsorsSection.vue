<script setup lang="ts">
import type { Sponsor } from '~/types'

defineProps<{
  sponsors: Sponsor[]
}>()

const tierLabel = {
  principal: 'Principal',
  gold: 'Gold',
  silver: 'Silver',
  local: 'Local',
}
</script>

<template>
  <section class="section-shell section-padding">
    <div class="section-container relative z-10">
      <p class="eyebrow-hero">004 // Sponsors</p>
      <div class="mt-3 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <h2 class="section-title-hero">Une vitrine pour les partenaires du rally valaisan.</h2>
          <p class="section-subtitle-hero">
            Les emplacements sponsors sont prets pour afficher les partenaires officiels, leurs activites et leurs liens.
          </p>
        </div>
        <div class="grid gap-4 md:grid-cols-2">
          <article v-for="sponsor in sponsors" :key="sponsor.id" class="section-card p-5">
            <span class="rounded bg-rally-red px-2 py-1 text-xs font-bold uppercase text-white">
              {{ tierLabel[sponsor.tier] }}
            </span>
            <h3 class="mt-4 font-display text-2xl font-bold text-white">{{ sponsor.name }}</h3>
            <p class="mt-3 text-sm leading-6 text-white/65">{{ sponsor.activity }}</p>
            <NuxtLink :to="sponsor.url" class="mt-5 inline-flex text-sm font-bold text-rally-red hover:text-white">
              En savoir plus
            </NuxtLink>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
