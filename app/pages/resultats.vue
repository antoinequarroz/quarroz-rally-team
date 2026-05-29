<script setup lang="ts">
const store = useRallyStore()
import type { RallyEvent, RallyResult, ShopProduct, Sponsor, TeamMember } from '~/types'

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
  title: 'Resultats',
  description: 'Resultats et historique de course du Quarroz Rally Team.',
})
</script>

<template>
  <SectionsResultsSection :results="store.latestResults" />
</template>
