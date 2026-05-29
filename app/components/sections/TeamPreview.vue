<script setup lang="ts">
import type { TeamMember } from '~/types'

defineProps<{
  members: TeamMember[]
}>()
</script>

<template>
  <section class="section-shell section-padding">
    <div class="section-container relative z-10">
      <p class="eyebrow-hero">001 // Equipe</p>
      <div class="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <h2 class="section-title-hero">Un projet rally ancre en Valais.</h2>
          <p class="section-subtitle-hero">
            Le MVP garde les informations essentielles visibles et faciles a mettre a jour: equipage, assistance, partenaires et prochaines courses.
          </p>
        </div>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-3">
        <article v-for="member in members" :key="member.id" class="section-card p-6">
          <p class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-rally-red">{{ member.role }}</p>
          <h3 class="mt-3 font-display text-2xl font-bold text-white">{{ member.name }}</h3>
          <p class="mt-4 text-sm leading-6 text-white/65">{{ member.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
