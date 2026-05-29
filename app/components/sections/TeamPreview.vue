<script setup lang="ts">
import type { TeamMember } from '~/types'

defineProps<{
  members: TeamMember[]
}>()
</script>

<template>
  <section class="section-padding">
    <div class="section-container">
      <p class="eyebrow">Equipe</p>
      <div class="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <h2 class="section-title">Un projet rally ancre en Valais.</h2>
          <p class="section-subtitle">
            Le MVP garde les informations essentielles visibles et faciles a mettre a jour: equipage, assistance, partenaires et prochaines courses.
          </p>
        </div>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-3">
        <article v-for="member in members" :key="member.id" class="panel p-6">
          <p class="text-sm font-bold uppercase tracking-[0.16em] text-rally-red">{{ member.role }}</p>
          <h3 class="mt-3 font-display text-2xl font-bold">{{ member.name }}</h3>
          <p class="mt-4 text-sm leading-6 text-rally-graphite/75 dark:text-rally-ice/70">{{ member.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
