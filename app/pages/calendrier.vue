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
  title: 'Calendrier',
  description: 'Calendrier des prochains rallyes du Quarroz Rally Team.',
})
</script>

<template>
  <SectionsCalendarSection :events="store.upcomingEvents" />
</template>
