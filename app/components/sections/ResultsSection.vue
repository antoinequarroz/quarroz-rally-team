<script setup lang="ts">
import type { RallyResult } from '~/types'

defineProps<{
  results: RallyResult[]
}>()
</script>

<template>
  <section class="section-shell section-padding">
    <div class="section-container relative z-10">
      <p class="eyebrow-hero">003 // Resultats</p>
      <h2 class="section-title-hero mt-3">Historique de course.</h2>
      <div class="mt-10 grid gap-5 md:grid-cols-2">
        <article v-for="result in results" :key="result.id" class="section-card p-6">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="text-sm font-bold text-rally-red">{{ result.date }}</p>
            <span class="rounded bg-white/10 px-3 py-1 text-xs font-bold text-white">{{ result.category }}</span>
          </div>
          <h3 class="mt-4 font-display text-2xl font-bold text-white">{{ result.eventName }}</h3>
          <dl class="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div class="rounded bg-white/5 p-3">
              <dt class="text-white/50">General</dt>
              <dd class="mt-1 font-bold text-white">{{ result.overallPosition }}</dd>
            </div>
            <div class="rounded bg-white/5 p-3">
              <dt class="text-white/50">Classe</dt>
              <dd class="mt-1 font-bold text-white">{{ result.classPosition }}</dd>
            </div>
          </dl>
          <p class="mt-5 text-sm leading-6 text-white/65">{{ result.summary }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
