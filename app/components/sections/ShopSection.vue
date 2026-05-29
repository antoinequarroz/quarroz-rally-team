<script setup lang="ts">
import type { ShopProduct } from '~/types'

defineProps<{
  products: ShopProduct[]
}>()

const formatPrice = (price: number) => new Intl.NumberFormat('fr-CH', {
  style: 'currency',
  currency: 'CHF',
  maximumFractionDigits: 0,
}).format(price)
</script>

<template>
  <section class="section-padding bg-white dark:bg-rally-asphalt">
    <div class="section-container">
      <p class="eyebrow">Shop</p>
      <h2 class="section-title mt-3">Boutique supporter MVP.</h2>
      <p class="section-subtitle">
        Catalogue pret pour precommandes. Le paiement peut etre branche ensuite avec Stripe ou une solution locale.
      </p>

      <div class="mt-10 grid gap-5 md:grid-cols-3">
        <article v-for="product in products" :key="product.id" class="panel flex flex-col overflow-hidden">
          <div class="grid aspect-[4/3] place-items-center bg-[linear-gradient(135deg,#15181d,#e11d2e)] p-6 text-center text-white">
            <p class="font-display text-3xl font-bold">{{ product.name }}</p>
          </div>
          <div class="flex flex-1 flex-col p-5">
            <div class="flex items-start justify-between gap-4">
              <h3 class="font-display text-xl font-bold">{{ product.name }}</h3>
              <p class="font-display text-xl font-bold text-rally-red">{{ formatPrice(product.price) }}</p>
            </div>
            <p class="mt-3 text-sm leading-6 text-rally-graphite/75 dark:text-rally-ice/70">{{ product.description }}</p>
            <button class="btn-primary mt-6 w-full" type="button">
              {{ product.stock === 'preorder' ? 'Precommander' : 'Demander' }}
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
