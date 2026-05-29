import type { RallyEvent, RallyResult, ShopProduct, Sponsor, TeamMember } from '~/types'

export const teamMembers: TeamMember[] = [
  {
    id: 'driver',
    name: 'Famille Quarroz',
    role: 'Equipage',
    description: 'Un projet familial construit autour du rally, du Valais et du plaisir de partager les speciales avec le public.',
  },
  {
    id: 'mechanics',
    name: 'Assistance QRT',
    role: 'Technique',
    description: 'Preparation, controles entre les boucles et suivi de la voiture avant, pendant et apres les rallyes.',
  },
  {
    id: 'partners',
    name: 'Partenaires locaux',
    role: 'Soutien',
    description: 'Des entreprises valaisannes et des amis du rally qui rendent la saison possible.',
  },
]

export const rallyEvents: RallyEvent[] = [
  {
    id: 'rallye-du-chablais',
    name: 'Rallye du Chablais',
    location: 'Aigle / Valais',
    date: '2026-05-28',
    status: 'upcoming',
    surface: 'Asphalte',
    championship: 'Suisse',
    note: 'Objectif: rythme propre, notes solides et arrivee.',
  },
  {
    id: 'rallye-international-du-valais',
    name: 'Rallye International du Valais',
    location: 'Martigny',
    date: '2026-10-22',
    status: 'upcoming',
    surface: 'Asphalte montagne',
    championship: 'Suisse',
    note: 'Le rendez-vous maison devant le public valaisan.',
  },
  {
    id: 'rallye-regional-alpes',
    name: 'Rallye Regional des Alpes',
    location: 'Alpes romandes',
    date: '2026-08-29',
    status: 'upcoming',
    surface: 'Asphalte',
    championship: 'Regional',
    note: 'Preparation et tests de reglages.',
  },
]

export const rallyResults: RallyResult[] = [
  {
    id: 'valais-2025',
    eventName: 'Rallye International du Valais',
    date: '2025-10-24',
    car: 'Voiture rally QRT',
    category: 'A confirmer',
    overallPosition: 'Arrivee',
    classPosition: 'A confirmer',
    summary: 'Experience utile sur les routes valaisannes, avec des enseignements pour la saison suivante.',
  },
  {
    id: 'chablais-2025',
    eventName: 'Rallye du Chablais',
    date: '2025-05-30',
    car: 'Voiture rally QRT',
    category: 'A confirmer',
    overallPosition: 'Arrivee',
    classPosition: 'A confirmer',
    summary: 'Un rallye de travail pour valider la fiabilite et reprendre le rythme.',
  },
]

export const sponsors: Sponsor[] = [
  {
    id: 'principal-local',
    name: 'Sponsor principal',
    tier: 'principal',
    activity: 'Place disponible pour une entreprise valaisanne',
    url: '/contact',
  },
  {
    id: 'garage',
    name: 'Partenaire garage',
    tier: 'gold',
    activity: 'Preparation et assistance mecanique',
    url: '/contact',
  },
  {
    id: 'amis',
    name: 'Club des amis',
    tier: 'local',
    activity: 'Soutien de proximite et presence sur les rallyes',
    url: '/contact',
  },
]

export const shopProducts: ShopProduct[] = [
  {
    id: 'tshirt-team',
    name: 'T-shirt Quarroz Rally Team',
    price: 29,
    category: 'textile',
    stock: 'preorder',
    description: 'T-shirt supporter en precommande, coupe confortable et marquage team.',
  },
  {
    id: 'cap-team',
    name: 'Casquette QRT',
    price: 25,
    category: 'textile',
    stock: 'preorder',
    description: 'Casquette noire avec marquage Quarroz Rally Team.',
  },
  {
    id: 'sticker-pack',
    name: 'Pack stickers',
    price: 8,
    category: 'supporter',
    stock: 'available',
    description: 'Stickers pour voiture, ordinateur ou caisse a outils.',
  },
]
