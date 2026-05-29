import { rallyEvents, rallyResults, shopProducts, sponsors, teamMembers } from '../../app/composables/useRallyData'

export default defineEventHandler(() => ({
  events: rallyEvents,
  results: rallyResults,
  sponsors,
  products: shopProducts,
  team: teamMembers,
}))
