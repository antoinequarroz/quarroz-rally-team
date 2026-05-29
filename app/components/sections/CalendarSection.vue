<script setup lang="ts">
import type { RallyEvent } from '~/types'

defineProps<{
  events: RallyEvent[]
}>()

const formatDate = (date: string) => new Intl.DateTimeFormat('fr-CH', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
}).format(new Date(`${date}T12:00:00`))
</script>

<template>
  <section class="section-padding bg-white dark:bg-rally-asphalt">
    <div class="section-container">
      <p class="eyebrow">Calendrier</p>
      <h2 class="section-title mt-3">Les prochains rendez-vous.</h2>
      <div class="mt-10 grid gap-4">
        <article v-for="event in events" :key="event.id" class="panel grid gap-5 p-5 md:grid-cols-[180px_1fr_auto] md:items-center">
          <div>
            <p class="text-sm font-bold text-rally-red">{{ formatDate(event.date) }}</p>
            <p class="mt-1 text-xs uppercase tracking-[0.16em] text-rally-graphite/60 dark:text-rally-ice/50">{{ event.championship }}</p>
          </div>
          <div>
            <h3 class="font-display text-2xl font-bold">{{ event.name }}</h3>
            <p class="mt-2 text-sm text-rally-graphite/70 dark:text-rally-ice/70">{{ event.location }} · {{ event.surface }}</p>
            <p class="mt-3 text-sm leading-6 text-rally-graphite/75 dark:text-rally-ice/65">{{ event.note }}</p>
          </div>
          <span class="rounded bg-rally-yellow px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-rally-ink">
            A venir
          </span>
        </article>
      </div>
    </div>
  </section>
</template>
