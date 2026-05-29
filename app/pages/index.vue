<script setup lang="ts">
import type { RallyEvent, RallyResult, ShopProduct, Sponsor, TeamMember } from '~/types'

const store = useRallyStore()
const { data } = await useFetch<{
  events: RallyEvent[]
  results: RallyResult[]
  sponsors: Sponsor[]
  products: ShopProduct[]
  team: TeamMember[]
}>('/api/rally')

if (data.value) {
  store.setData(data.value)
}

useSeoMeta({
  title: 'Accueil',
  description: 'Quarroz Rally Team, equipe valaisanne de rally: calendrier, resultats, sponsors, equipe et boutique supporter.',
  ogTitle: 'Quarroz Rally Team',
  ogDescription: 'Equipe valaisanne de rally avec calendrier, resultats, sponsors et boutique supporter.',
})
</script>

<template>
  <div>
    <SectionsHeroSection />
    <SectionsTeamPreview :members="store.team" />
    <SectionsCalendarSection :events="store.upcomingEvents" />
    <SectionsResultsSection :results="store.latestResults" />
    <SectionsSponsorsSection :sponsors="store.sponsors" />
    <SectionsShopSection :products="store.products" />
    <SectionsContactSection />
  </div>
</template>
