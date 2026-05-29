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
  title: 'Equipe',
  description: 'Presentation du Quarroz Rally Team, equipe valaisanne de rally.',
})
</script>

<template>
  <SectionsTeamPreview :members="store.team" />
</template>
