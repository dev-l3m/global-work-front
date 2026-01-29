<script setup lang="ts">
import { onMounted, ref } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section class="hero">
    <div class="hero-gradient" />
    <div class="hero-pattern" />
    <v-container class="py-16 hero-content">
      <v-row align="center">
        <v-col cols="12" md="7" :class="{ 'fade-in-up': isVisible }">
          <div class="text-overline text-secondary font-weight-bold hero-overline">
            Bienvenue sur Global Work Hub
          </div>
          <h1 class="text-h3 text-md-h2 text-lg-h1 font-weight-bold mt-3 hero-title">
            Recrutement international avec accompagnement RH intégré
          </h1>
          <div class="text-body-1 text-medium-emphasis mt-4 hero-subtitle">
            Vous cherchez des talents fiables&nbsp;? Nous avons la solution globale. Chez
            <strong>Global Work Hub</strong>, nous mettons en relation les entreprises avec des
            profils internationaux hautement qualifiés, sélectionnés, encadrés et prêts à rejoindre
            vos équipes.
          </div>
          <div class="d-flex ga-3 mt-8 flex-wrap">
            <v-btn
              color="secondary"
              size="large"
              class="text-none font-weight-bold hero-cta-primary"
              href="#contact"
            >
              <v-icon icon="mdi-send" class="mr-2" />
              Envoyer votre demande
            </v-btn>
            <v-btn
              variant="outlined"
              color="white"
              size="large"
              class="text-none hero-cta-secondary"
              href="#pourquoi"
            >
              Pourquoi Global Work Hub
              <v-icon icon="mdi-arrow-right" class="ml-2" />
            </v-btn>
          </div>
          <div class="d-flex ga-6 mt-10 text-body-2 text-high-emphasis hero-badges flex-wrap">
            <div class="badge-item">
              <span class="badge-dot" />
              Stabilité, conformité et qualité
            </div>
            <div class="badge-item">
              <span class="badge-dot" />
              Solution RH complète
            </div>
            <div class="badge-item">
              <span class="badge-dot" />
              Talents engagés dans +15 pays
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="5" :class="{ 'fade-in-right': isVisible }">
          <v-card class="pa-6 hero-card" elevation="10">
            <div class="d-flex align-center ga-2 mb-2">
              <v-icon icon="mdi-shield-check" color="primary" size="24" />
              <div class="text-subtitle-1 font-weight-bold">Espace sécurisé</div>
            </div>
            <div class="text-body-2 text-medium-emphasis mb-4">
              Accédez à votre espace client ou collaborateur pour suivre vos demandes, missions et
              documents.
            </div>
            <v-row>
              <v-col cols="12">
                <v-btn
                  block
                  color="secondary"
                  size="large"
                  class="mb-2 text-none font-weight-bold"
                  to="/connexion?role=client"
                >
                  <v-icon icon="mdi-briefcase" class="mr-2" />
                  Espace client
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn
                  block
                  variant="tonal"
                  color="primary"
                  size="large"
                  class="text-none"
                  to="/connexion?role=collaborateur"
                >
                  <v-icon icon="mdi-account-group" class="mr-2" />
                  Espace collaborateur
                </v-btn>
              </v-col>
            </v-row>
            <v-divider class="my-4" />
            <div class="text-caption text-medium-emphasis text-center">
              Vous n'avez pas encore de compte&nbsp;?
              <a href="#contact" class="text-primary text-decoration-none">Contactez-nous</a>
              pour ouvrir votre espace Global Work Hub.
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  color: #ffffff;
  min-height: 90vh;
  display: flex;
  align-items: center;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #6b5ae0 0%, #8e6be8 35%, #ff7a3c 100%);
  animation: gradient-shift 15s ease infinite;
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.1) 1px, transparent 0);
  background-size: 40px 40px;
  opacity: 0.3;
  animation: pattern-move 20s linear infinite;
}

@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes pattern-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(40px, 40px);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-overline {
  letter-spacing: 2px;
  opacity: 0.9;
}

.hero-title {
  line-height: 1.2;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  font-size: 4rem !important;
}

@media (max-width: 960px) {
  .hero-title {
    font-size: 2.5rem !important;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 2rem !important;
  }
}

.hero-subtitle {
  max-width: 520px;
  line-height: 1.7;
}

.hero-cta-primary {
  box-shadow: 0 4px 20px rgba(255, 122, 60, 0.4);
  transition: all 0.3s ease;
}

.hero-cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(255, 122, 60, 0.5);
}

.hero-cta-secondary {
  border-width: 2px;
  transition: all 0.3s ease;
}

.hero-cta-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.hero-badges {
  opacity: 0.95;
}

.badge-item {
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.badge-item:hover {
  transform: translateX(4px);
}

.badge-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: #ff7a3c;
  box-shadow: 0 0 10px rgba(255, 122, 60, 0.6);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.hero-card {
  background-color: rgba(255, 255, 255, 0.98);
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(11, 18, 40, 0.45);
  backdrop-filter: blur(10px);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.hero-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 32px 80px rgba(11, 18, 40, 0.5);
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.fade-in-right {
  animation: fadeInRight 0.8s ease-out 0.2s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 960px) {
  .hero {
    min-height: auto;
    padding: 40px 0;
  }
}
</style>
