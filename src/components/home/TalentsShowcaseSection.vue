<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

export interface TalentItem {
  id: number | string
  name: string
  img: string
  alt: string
}

const { t, tm, locale } = useI18n()

const talentImages = [
  'https://www.piclumen.com/wp-content/uploads/2024/12/ai-avatar-maker-businesswoman.webp',
  'https://image.cdn2.seaart.me/static/upload/20241129/ddeb4e66-ec2c-4c00-84ec-84ef7df903f8.png',
  'https://image.cdn2.seaart.me/static/upload/20241129/0ccd5f1e-ffd3-414e-a11c-5ba6d459fb64.png',
  'https://th.bing.com/th/id/OIP.qjlzs8lxpCI5jHjDOeDizgHaHa?w=197&h=197&c=7&r=0&o=7&cb=defcache2&dpr=2&pid=1.7&rm=3&defcache=1',
  'https://img.freepik.com/premium-photo/isolated-businessman-character-avatar-professional-branding_1029469-184073.jpg?semt=ais_hybrid',
  'https://img.freepik.com/photos-premium/rendering-3d-avatar-appel-zoom_917213-234935.jpg?semt=ais_hybrid',
]

const talents = computed(() => {
  void locale.value // Pour la réactivité
  const names = tm('talentsShowcase.talentNames') as string[] | undefined
  const alts = tm('talentsShowcase.talentAlts') as string[] | undefined

  // Debug en développement
  if (import.meta.env.DEV && (!names || !Array.isArray(names))) {
    console.warn('⚠️ TalentsShowcase: talentNames not found or not an array', names)
  }

  if (!names || !Array.isArray(names) || names.length === 0) {
    return []
  }

  return names.map((name, index) => ({
    id: index + 1,
    name,
    img: talentImages[index] || '',
    alt: alts && Array.isArray(alts) && alts[index] ? alts[index] : name,
  }))
})

const talentsForScroll = computed(() =>
  talents.value.length ? [...talents.value, ...talents.value] : []
)

const categories = computed(() => {
  void locale.value // Pour la réactivité
  const cats = tm('talentsShowcase.categories') as string[] | undefined
  return cats && Array.isArray(cats) ? cats : []
})

onMounted(() => {
  // fetchTalents().then(data => { talents.value = data })
})
</script>

<template>
  <section id="talents-showcase" class="talents-showcase-section">
    <v-container class="section-container py-8 py-md-16">
      <div class="text-center mb-6 mb-md-8 px-2" v-reveal="{ variant: 'up', delay: 0 }">
        <h2 class="vitrines-title text-h5 text-md-h4 text-lg-h3 font-weight-bold mb-3 mb-md-4">
          {{ t('talentsShowcase.title') }}
        </h2>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p
          class="text-body-2 text-md-body-1 text-medium-emphasis mx-auto vitrines-description"
          v-html="t('talentsShowcase.description')"
        ></p>
      </div>

      <div class="scroll-wrapper mb-6 mb-md-8" v-reveal="{ variant: 'up', delay: 90 }">
        <div class="scroll-track" v-if="talentsForScroll.length > 0">
          <div class="scroll-inner">
            <v-card
              v-for="(talent, index) in talentsForScroll"
              :key="`talent-scroll-${index}`"
              class="talent-card"
              elevation="2"
            >
              <v-img :src="talent.img" :alt="talent.alt" cover class="talent-img" loading="lazy" />
              <div class="text-center text-caption font-weight-medium pa-2 talent-label">
                {{ talent.name }}
              </div>
            </v-card>
          </div>
        </div>
        <div v-else class="text-center text-medium-emphasis pa-8">
          <v-icon size="48" class="mb-4">mdi-alert-circle-outline</v-icon>
          <p>Chargement des talents...</p>
        </div>
      </div>

      <div
        class="categories-bar d-flex flex-wrap justify-center align-center ga-2 px-2"
        v-reveal="{ variant: 'up', delay: 180 }"
      >
        <template v-for="(cat, idx) in categories" :key="idx">
          <span v-if="idx > 0" class="text-medium-emphasis sep d-none d-sm-inline">/</span>
          <span class="category-item text-caption text-body-2">{{ cat }}</span>
        </template>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.talents-showcase-section {
  background: rgba(240, 238, 248, 0.5);
}

.vitrines-title {
  color: rgb(var(--v-theme-primary));
}

.vitrines-description {
  max-width: 720px;
  line-height: 1.7;
}

.scroll-wrapper {
  overflow: hidden;
  width: 100%;
}

.scroll-track {
  width: 100%;
}

.scroll-inner {
  display: flex;
  gap: 24px;
  width: max-content;
  animation: scroll-horizontal 40s linear infinite;
}

.scroll-wrapper:hover .scroll-inner {
  animation-play-state: paused;
}

@keyframes scroll-horizontal {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.talent-card {
  flex-shrink: 0;
  width: 220px;
  border-radius: 16px;
  overflow: hidden;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.talent-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(107, 90, 224, 0.2);
}

.talent-img {
  height: 220px;
  width: 220px;
  object-fit: cover;
}

.talent-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.categories-bar {
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(107, 90, 224, 0.1);
}

.category-item {
  color: rgba(0, 0, 0, 0.75);
}

.sep {
  user-select: none;
}

@media (max-width: 960px) {
  .scroll-inner {
    gap: 16px;
    animation-duration: 35s;
  }

  .talent-card {
    width: 160px;
  }

  .talent-img {
    height: 160px !important;
    width: 160px !important;
  }
}

@media (max-width: 600px) {
  .section-container {
    padding-left: 12px;
    padding-right: 12px;
  }

  .vitrines-description {
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .scroll-inner {
    gap: 12px;
    animation-duration: 30s;
  }

  .talent-card {
    width: 140px;
  }

  .talent-img {
    height: 140px !important;
    width: 140px !important;
  }

  .talent-label {
    font-size: 0.7rem;
    padding: 6px 8px !important;
  }

  .categories-bar {
    padding: 10px 12px;
    gap: 6px;
  }

  .category-item {
    font-size: 0.7rem;
  }
}
</style>
