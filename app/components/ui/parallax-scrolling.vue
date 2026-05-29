<script setup lang="ts">
import { ArrowDown } from '@lucide/vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

const parallaxRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const root = parallaxRef.value
  if (!root) {
    return
  }

  const triggerElement = root.querySelector<HTMLElement>('[data-parallax-layers]')
  if (!triggerElement) {
    return
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.45,
    },
  })

  const layers = [
    { layer: '1', yPercent: 85, scale: 1.16, opacity: 0.35 },
    { layer: '2', yPercent: 58, scale: 1.11, opacity: 0.5 },
    { layer: '3', yPercent: 35, scale: 1.04, opacity: 1 },
    { layer: '4', yPercent: 14, scale: 1.01, opacity: 1 },
  ]

  layers.forEach((layerObj, idx) => {
    tl.to(
      triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
      {
        yPercent: layerObj.yPercent,
        scale: layerObj.scale,
        opacity: layerObj.opacity,
        ease: 'none',
      },
      idx === 0 ? undefined : '<',
    )
  })

  const lenis = new Lenis({
    smoothWheel: true,
    duration: 1.1,
  })

  lenis.on('scroll', ScrollTrigger.update)
  const raf = (time: number) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(st => st.kill())
    gsap.killTweensOf(triggerElement)
    gsap.ticker.remove(raf)
    lenis.destroy()
  })
})
</script>

<template>
  <section ref="parallaxRef" class="parallax bg-rally-ink text-white">
    <div class="section-container pt-8">
      <p class="eyebrow text-rally-yellow">Hero Test</p>
    </div>

    <div class="parallax__visuals">
      <div class="parallax__overlay" />
      <div class="parallax__grid" />

      <div data-parallax-layers class="parallax__layers">
        <img
          src="https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?auto=format&fit=crop&w=1800&q=80"
          alt="Rally road"
          data-parallax-layer="1"
          class="parallax__layer-img parallax__layer-bg"
        >
        <img
          src="https://images.unsplash.com/photo-1471478331149-c72f17e33c73?auto=format&fit=crop&w=1600&q=80"
          alt="Rally dust"
          data-parallax-layer="2"
          class="parallax__layer-img parallax__layer-mid"
        >
        <div data-parallax-layer="3" class="parallax__layer-title">
          <h1 class="parallax__title">Rallye Team Quarroz</h1>
          <p class="parallax__subtitle">Version parallax test plus lisible et plus dynamique</p>
          <div class="parallax__chips">
            <span>VALAIS</span>
            <span>SEASON 2026</span>
            <span>RALLY</span>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&w=1600&q=80"
          alt="Rally lights"
          data-parallax-layer="4"
          class="parallax__layer-img parallax__layer-front"
        >
      </div>

      <div class="parallax__fade" />
    </div>

    <div class="section-container pb-10">
      <div class="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
        <ArrowDown :size="16" />
        Scroll pour voir l'effet
      </div>
    </div>
  </section>
</template>

<style scoped>
.parallax {
  position: relative;
  overflow: hidden;
}

.parallax__visuals {
  position: relative;
  min-height: min(92vh, 860px);
}

.parallax__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background:
    linear-gradient(115deg, rgba(225, 29, 46, 0.55) 0%, rgba(11, 13, 16, 0.08) 42%),
    linear-gradient(180deg, rgba(11, 13, 16, 0.06) 0%, rgba(11, 13, 16, 0.88) 100%);
}

.parallax__grid {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.2;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
  background-size: 42px 42px;
}

.parallax__layers {
  position: relative;
  z-index: 0;
  min-height: min(92vh, 860px);
}

.parallax__layer-img,
.parallax__layer-title {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.parallax__layer-img {
  object-fit: cover;
  filter: saturate(0.95) contrast(1.05);
}

.parallax__layer-bg {
  object-position: 50% 20%;
}

.parallax__layer-mid {
  object-position: 50% 55%;
  mix-blend-mode: screen;
  opacity: 0.8;
}

.parallax__layer-front {
  object-position: 50% 65%;
  filter: saturate(1.15) contrast(1.08);
}

.parallax__layer-title {
  z-index: 4;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(1rem, 2vw, 2rem);
  padding-bottom: clamp(5rem, 9vw, 8rem);
}

.parallax__title {
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-size: clamp(2.5rem, 8vw, 7rem);
  font-weight: 700;
  line-height: 0.95;
}

.parallax__subtitle {
  margin-top: 0.9rem;
  max-width: 520px;
  font-size: clamp(0.95rem, 1.8vw, 1.2rem);
  color: rgba(238, 244, 248, 0.88);
}

.parallax__chips {
  margin-top: 1.1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.parallax__chips span {
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(11, 13, 16, 0.4);
  border-radius: 8px;
  padding: 0.4rem 0.7rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.parallax__fade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 22%;
  z-index: 4;
  background: linear-gradient(180deg, rgba(11, 13, 16, 0) 0%, rgba(11, 13, 16, 1) 100%);
}
</style>
