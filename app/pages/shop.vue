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
  title: 'Shop',
  description: 'Boutique supporter du Quarroz Rally Team.',
})
</script>

<template>
  <SectionsShopSection :products="store.products" />
</template>
