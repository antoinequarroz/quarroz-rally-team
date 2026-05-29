export type RallyStatus = 'upcoming' | 'finished'

export interface RallyEvent {
  id: string
  name: string
  location: string
  date: string
  status: RallyStatus
  surface: string
  championship: string
  note: string
}

export interface RallyResult {
  id: string
  eventName: string
  date: string
  car: string
  category: string
  overallPosition: string
  classPosition: string
  summary: string
}

export interface Sponsor {
  id: string
  name: string
  tier: 'principal' | 'gold' | 'silver' | 'local'
  activity: string
  url: string
}

export interface ShopProduct {
  id: string
  name: string
  price: number
  category: 'textile' | 'accessoire' | 'supporter'
  stock: 'available' | 'preorder'
  description: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  description: string
}

export interface ContactRequest {
  name: string
  email: string
  subject: string
  message: string
}
