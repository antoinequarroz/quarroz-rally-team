<script setup lang="ts">
import type { RallyResult } from '~/types'

defineProps<{
  results: RallyResult[]
}>()
</script>

<template>
  <section class="section-padding">
    <div class="section-container">
      <p class="eyebrow">Resultats</p>
      <h2 class="section-title mt-3">Historique de course.</h2>
      <div class="mt-10 grid gap-5 md:grid-cols-2">
        <article v-for="result in results" :key="result.id" class="panel p-6">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="text-sm font-bold text-rally-red">{{ result.date }}</p>
            <span class="rounded bg-rally-ink px-3 py-1 text-xs font-bold text-white dark:bg-white dark:text-rally-ink">{{ result.category }}</span>
          </div>
          <h3 class="mt-4 font-display text-2xl font-bold">{{ result.eventName }}</h3>
          <dl class="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div class="rounded bg-rally-mist p-3 dark:bg-rally-graphite">
              <dt class="text-rally-graphite/60 dark:text-rally-ice/55">General</dt>
              <dd class="mt-1 font-bold">{{ result.overallPosition }}</dd>
            </div>
            <div class="rounded bg-rally-mist p-3 dark:bg-rally-graphite">
              <dt class="text-rally-graphite/60 dark:text-rally-ice/55">Classe</dt>
              <dd class="mt-1 font-bold">{{ result.classPosition }}</dd>
            </div>
          </dl>
          <p class="mt-5 text-sm leading-6 text-rally-graphite/75 dark:text-rally-ice/70">{{ result.summary }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
