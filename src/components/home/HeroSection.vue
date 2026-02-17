<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    heroImage?: string
    heroAlt?: string
  }>(),
  {
    heroImage:
      'https://private-us-east-1.manuscdn.com/sessionFile/sVFzcOhWixDoUdpSw4fAiC/sandbox/LLFgvOCLVC8lmgtDTndQIK-img-2_1770738748000_na1fn_Z2xvYmFsLW5ldHdvcms.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc1ZGemNPaFdpeERvVWRwU3c0ZkFpQy9zYW5kYm94L0xMRmd2T0NMVkM4bG1ndERUbmRRSUstaW1nLTJfMTc3MDczODc0ODAwMF9uYTFmbl9aMnh2WW1Gc0xXNWxkSGR2Y21zLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=K~w5L3aHlEJlEOpIijW3luQa2OGR6t7EjEUvSfNI6OUfbOGYOHSCPkfWBAXq1xeYA~HkCe5CK5nLLB~8fW8OHPNguHVXJGPM~SzbMUHuOpmG7BMWyp2NHzNpUeWZbOWLc2P0bfGJ2HH0FMDp1lOnDx0vXnZynkxvaiJJsADMyo2wRtPajKZQnKPkRzKRQ6odS7EtqFTNuYfnwoeYEPzIrNe3UMj4cGRZ8vz8G2lMtuSPuE~z4MW7JOAljsjyDJ-IsiRbCYgNnE4YRZRzLAW3T3qJ2c714PeIcKNoB~6pACraa84tQilic0-YJT877uuoq7h0290~q7Q4qdYVUJLQUA__',
    heroAlt: 'Réseau global et talents internationaux - Global Work Hub',
  }
)

const stats = [
  { value: '100%', label: 'Taux de renouvellement', color: 'oklch(50% 0.2 290)' },
  { value: '200+', label: 'Talents déployés', color: 'oklch(71% 0.13 47.81)' },
  { value: '15+', label: 'Pays actifs', color: 'oklch(60% 0.2 240)' },
  { value: 'FR/EN/AR', label: 'Support multilingue', color: 'oklch(49% 0.19 288.58)' },
]
</script>

<template>
  <section class="hero">
    <div class="hero-bg" aria-hidden="true" />
    <v-container class="hero-content py-16">
      <v-row align="center">
        <v-col cols="12" md="7">
          <span class="hero-pill" v-reveal="{ variant: 'up', delay: 0 }"
            >Recrutement international d'équipes encadrées</span
          >
          <h1 class="hero-title" v-reveal="{ variant: 'up', delay: 120 }">
            Le monde est votre vivier de talents
          </h1>
          <p class="hero-subtitle" v-reveal="{ variant: 'up', delay: 240 }">
            Nous transformons votre vision en équipes performantes, partout dans le monde. Global
            Work Hub connecte les entreprises aux meilleurs professionnels internationaux,
            sélectionnés, encadrés et prêts à performer dès le premier jour.
          </p>
          <p class="hero-tagline" v-reveal="{ variant: 'up', delay: 320 }">
            Une approche simple, rapide et ultra-compétitive qui booste vos performances sans
            exploser vos coûts.
          </p>
          <div class="hero-ctas" v-reveal="{ variant: 'up', delay: 420 }">
            <v-btn href="#contact" size="large" class="hero-cta-primary text-none font-weight-bold">
              <v-icon icon="mdi-phone-in-talk" start />
              Parler à un expert
            </v-btn>
            <v-btn
              to="/recrutement"
              size="large"
              variant="outlined"
              class="hero-cta-secondary text-none font-weight-medium"
            >
              <v-icon icon="mdi-account-search" start />
              Découvrir nos services
            </v-btn>
          </div>
          <div class="hero-stats" v-reveal="{ variant: 'up', delay: 520 }">
            <div v-for="(stat, i) in stats" :key="i" class="hero-stat">
              <span class="hero-stat-value" :style="{ color: stat.color }">{{ stat.value }}</span>
              <span class="hero-stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="5" class="hero-col-img" v-reveal="{ variant: 'scale', delay: 260 }">
          <v-card class="hero-card" elevation="0">
            <div class="hero-card-img-wrap">
              <v-img
                :src="props.heroImage"
                :alt="props.heroAlt"
                cover
                aspect-ratio="16/10"
                class="hero-card-img"
                loading="lazy"
              />
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.hero {
  --bg-main: #f0eef8;
  --bg-soft: #f5f6fa;
  --primary: #6b5ae0;
  --primary-soft: #eeeafe;
  --accent: #ff7a3c;
  --accent-soft: #fff1ea;
  --hero-primary: var(--primary);
  --hero-primary-light: #8e6be8;
  --hero-primary-soft: var(--primary-soft);
  --hero-accent-soft: var(--accent-soft);
  --hero-text: #0b0f19;
  --hero-text-secondary: #5b6270;
  --hero-text-muted: #8a90a2;
  --hero-outline: #a5a0c4;
  --hero-shadow: 0 24px 60px rgba(11, 18, 40, 0.15);
  --hero-shadow-hover: 0 30px 80px rgba(11, 18, 40, 0.2);
}

@supports (color: oklch(0.5 0.1 0)) {
  .hero {
    --bg-main: oklch(99% 0.002 290);
    --bg-soft: oklch(96% 0.005 290);
    --primary: oklch(62% 0.19 285);
    --primary-soft: oklch(90% 0.05 285);
    --accent: oklch(72% 0.19 45);
    --accent-soft: oklch(92% 0.06 45);
  }
}

.hero {
  position: relative;
  overflow: hidden;
  background: var(--bg-main);
  min-height: 90vh;
  display: flex;
  align-items: center;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0.5;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.35) 100%);
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-color: var(--bg-main);
  background-image: url('/assets/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.25) 100%);
}

.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(ellipse 80% 60% at 15% 20%, var(--primary-soft) 0%, transparent 50%),
    radial-gradient(ellipse 70% 50% at 85% 15%, var(--accent-soft) 0%, transparent 50%);
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.7;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-pill {
  display: inline-block;
  padding: 8px 18px;
  background: var(--hero-primary-soft);
  color: var(--hero-primary);
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  margin-bottom: 1.25rem;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 4.25rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--hero-text);
  margin: 0 0 1.25rem;
}

@media (min-width: 960px) {
  .hero-title {
    font-size: 4.25rem;
  }
}

@media (min-width: 1280px) {
  .hero-title {
    font-size: 4.5rem;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 2rem;
  }
}

.hero-subtitle {
  max-width: 600px;
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--hero-text-secondary);
  margin: 0 0 0.75rem;
}

.hero-tagline {
  max-width: 600px;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--hero-text-muted);
  margin: 0 0 2rem;
  font-weight: 500;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 2.5rem;
}

.hero-cta-primary {
  background: var(--hero-primary) !important;
  color: white !important;
  box-shadow: 0 10px 40px rgba(107, 90, 224, 0.2);
  transition:
    background 0.25s ease,
    transform 0.2s ease,
    box-shadow 0.25s ease;
}

.hero-cta-primary:hover {
  background: var(--hero-primary-light) !important;
  transform: translateY(-2px);
  box-shadow: var(--hero-shadow-hover);
}

.hero-cta-secondary {
  border: 2px solid var(--hero-outline) !important;
  color: var(--hero-text-secondary) !important;
  background: transparent !important;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    transform 0.2s ease;
}

.hero-cta-secondary:hover {
  background: var(--hero-primary-soft) !important;
  border-color: var(--hero-primary) !important;
  color: var(--hero-primary) !important;
  transform: translateY(-2px);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem 1.5rem;
  max-width: 560px;
}

@media (min-width: 960px) {
  .hero-stats {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem 2rem;
  }
}

.hero-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.hero-stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--hero-text);
  line-height: 1.2;
}

.hero-stat-label {
  font-size: 0.875rem;
  color: var(--hero-text-muted);
  line-height: 1.3;
}

.hero-card {
  border-radius: 28px;
  box-shadow: var(--hero-shadow);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  width: 100%;
}

.hero-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--hero-shadow-hover);
}

.hero-card-img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #f5f6fa;
  min-height: 180px;
}

.hero-card-img {
  width: 100%;
  height: 100%;
  background: #f5f6fa;
}

.hero-card-img :deep(.v-img),
.hero-card-img :deep(.v-img__wrapper),
.hero-card-img :deep(.v-img__img),
.hero-card-img :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Mobile: force container height so v-img (absolutely positioned in Vuetify 3) has a reference */
@media (max-width: 959px) {
  .hero-col-img {
    min-height: 220px;
  }

  .hero-card-img-wrap {
    min-height: 220px;
  }
}

@media (max-width: 960px) {
  .hero {
    min-height: auto;
    padding: 2.5rem 0;
  }

  .hero-ctas .v-btn {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .hero-content {
    padding-left: 16px;
    padding-right: 16px;
  }

  .hero-stats {
    gap: 1rem 1.25rem;
  }
}
</style>
