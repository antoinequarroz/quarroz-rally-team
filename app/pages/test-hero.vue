<script setup lang="ts">
useSeoMeta({
  title: 'Hero Test',
  description: 'Test hero parallax pour Rallye Team Quarroz.',
})
</script>

<template>
  <div>
    <UiParallaxScrolling />

    <section class="section-padding">
      <div class="section-container">
        <p class="eyebrow">Notes</p>
        <h2 class="section-title mt-3">Le hero actuel de la home est conserve.</h2>
        <p class="section-subtitle">
          Cette page est un test isole pour valider le style visuel et l'animation avant integration eventuelle sur la page d'accueil.
        </p>
      </div>
    </section>
  </div>
</template>
