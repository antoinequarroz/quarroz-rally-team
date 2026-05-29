<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <section class="relative isolate overflow-hidden bg-rally-ink text-white">
    <div class="absolute inset-0 opacity-35">
      <div class="h-full w-full bg-[linear-gradient(115deg,rgba(225,29,46,.55),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(244,196,48,.25),transparent_30%),linear-gradient(180deg,#0b0d10,#15181d)]" />
    </div>
    <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-rally-mist dark:from-rally-ink" />

    <div class="section-container relative grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 lg:grid-cols-[1.05fr_.95fr]">
      <div>
        <p class="eyebrow text-rally-yellow">Rally team valaisan</p>
        <h1 class="mt-5 max-w-3xl font-display text-5xl font-bold leading-[0.95] md:text-7xl">
          Rallye Team Quarroz
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-rally-ice/78">
          Une equipe de passionnes en Valais: calendrier, resultats, sponsors, informations d'equipe et boutique supporter au meme endroit.
        </p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <NuxtLink :to="localePath('/calendrier')" class="btn-primary">
            Voir le calendrier
          </NuxtLink>
          <NuxtLink :to="localePath('/sponsors')" class="btn-secondary border-white/20 bg-white/10 text-white hover:border-rally-yellow hover:text-rally-yellow">
            Devenir sponsor
          </NuxtLink>
        </div>
      </div>

      <div class="panel border-white/10 bg-white/10 p-5 backdrop-blur">
        <div class="aspect-[4/3] rounded-md bg-[linear-gradient(135deg,#e11d2e,#242932_45%,#f4c430)] p-1">
          <div class="flex h-full flex-col justify-between rounded bg-rally-ink p-6">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold uppercase tracking-[0.18em] text-rally-yellow">Season 2026</span>
              <span class="rounded bg-white px-2 py-1 text-xs font-bold text-rally-ink">VALAIS</span>
            </div>
            <div>
              <div class="h-2 w-28 bg-rally-red" />
              <p class="mt-5 font-display text-4xl font-bold">Speciales, passion, precision.</p>
            </div>
            <div class="grid grid-cols-3 gap-3 text-center">
              <div class="rounded bg-white/10 p-3">
                <p class="font-display text-2xl font-bold">3</p>
                <p class="text-xs text-rally-ice/60">Rallyes MVP</p>
              </div>
              <div class="rounded bg-white/10 p-3">
                <p class="font-display text-2xl font-bold">100%</p>
                <p class="text-xs text-rally-ice/60">Valais</p>
              </div>
              <div class="rounded bg-white/10 p-3">
          <p class="font-display text-2xl font-bold">RTQ</p>
                <p class="text-xs text-rally-ice/60">Team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
