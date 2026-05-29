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
  <section class="section-padding bg-rally-ink text-white">
    <div class="section-container">
      <p class="eyebrow text-rally-yellow">Sponsors</p>
      <div class="mt-3 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <h2 class="font-display text-3xl font-bold leading-tight md:text-5xl">
            Une vitrine pour les partenaires du rally valaisan.
          </h2>
          <p class="mt-4 text-rally-ice/70">
            Les emplacements sponsors sont prets pour afficher les partenaires officiels, leurs activites et leurs liens.
          </p>
        </div>
        <div class="grid gap-4 md:grid-cols-2">
          <article v-for="sponsor in sponsors" :key="sponsor.id" class="rounded-lg border border-white/10 bg-white/8 p-5">
            <span class="rounded bg-rally-yellow px-2 py-1 text-xs font-bold uppercase text-rally-ink">
              {{ tierLabel[sponsor.tier] }}
            </span>
            <h3 class="mt-4 font-display text-2xl font-bold">{{ sponsor.name }}</h3>
            <p class="mt-3 text-sm leading-6 text-rally-ice/70">{{ sponsor.activity }}</p>
            <NuxtLink :to="sponsor.url" class="mt-5 inline-flex text-sm font-bold text-rally-yellow hover:text-white">
              En savoir plus
            </NuxtLink>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
