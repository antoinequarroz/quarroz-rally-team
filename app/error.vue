<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}>()

const handleClear = () => clearError({ redirect: '/' })
</script>

<template>
  <main class="min-h-screen bg-rally-ink text-white">
    <section class="section-container flex min-h-screen flex-col items-start justify-center">
      <p class="eyebrow">Erreur {{ props.error.statusCode || 500 }}</p>
      <h1 class="mt-4 max-w-2xl font-display text-4xl font-bold md:text-6xl">
        La route est coupee.
      </h1>
      <p class="mt-5 max-w-xl text-rally-ice/70">
        {{ props.error.statusMessage || props.error.message || 'La page demandee est indisponible.' }}
      </p>
      <button class="btn-primary mt-8" type="button" @click="handleClear">
        Retour au site
      </button>
    </section>
  </main>
</template>
