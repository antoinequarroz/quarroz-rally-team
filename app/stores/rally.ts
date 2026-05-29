import { defineStore } from 'pinia'
import type { RallyEvent, RallyResult, ShopProduct, Sponsor, TeamMember } from '~/types'

interface RallyState {
  events: RallyEvent[]
  results: RallyResult[]
  sponsors: Sponsor[]
  products: ShopProduct[]
  team: TeamMember[]
}

export const useRallyStore = defineStore('rally', {
  state: (): RallyState => ({
    events: [],
    results: [],
    sponsors: [],
    products: [],
    team: [],
  }),
  getters: {
    upcomingEvents: state => state.events.filter(event => event.status === 'upcoming').sort((a, b) => a.date.localeCompare(b.date)),
    latestResults: state => state.results.slice().sort((a, b) => b.date.localeCompare(a.date)),
    mainSponsors: state => state.sponsors.filter(sponsor => sponsor.tier === 'principal' || sponsor.tier === 'gold'),
  },
  actions: {
    setData(data: RallyState) {
      this.events = data.events
      this.results = data.results
      this.sponsors = data.sponsors
      this.products = data.products
      this.team = data.team
    },
  },
  persist: true,
})
