<script setup lang="ts">
useSeoMeta({
  title: 'Experience Hero Test',
  description: 'Test hero 3D experience style pour Rallye Team Quarroz.',
})
</script>

<template>
  <div class="dark min-h-screen bg-[#020202] selection:bg-white selection:text-black">
    <main class="relative w-full overflow-x-hidden">
      <UiExperienceHero />
      <div class="bento-mask pointer-events-none fixed inset-0 z-[100] opacity-10" />
    </main>
  </div>
</template>
