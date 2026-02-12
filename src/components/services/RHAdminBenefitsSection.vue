<script setup lang="ts">
const benefits = [
  {
    title: 'Sécurité juridique totale',
    icon: 'mdi-shield-lock',
    color: 'primary',
    description:
      'Conformité garantie avec toutes les législations locales et européennes. Protection complète de votre entreprise.',
  },
  {
    title: 'Réduction des coûts RH',
    icon: 'mdi-cash-multiple',
    color: 'secondary',
    description:
      'Optimisation de vos dépenses RH grâce à une gestion centralisée et des processus efficaces.',
  },
  {
    title: 'Suivi continu et personnalisé',
    icon: 'mdi-account-heart',
    color: 'success',
    description:
      'Un accompagnement dédié et personnalisé pour chaque talent, avec un suivi régulier de leur performance.',
  },
]
</script>

<template>
  <v-container class="py-16 benefits-section">
    <div class="text-center mb-12">
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">Avantages pour votre entreprise</div>
    </div>

    <v-row>
      <v-col
        v-for="(benefit, index) in benefits"
        :key="index"
        cols="12"
        md="4"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.2,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-8 benefit-card h-100" elevation="4">
          <div class="text-center mb-4">
            <v-avatar :color="benefit.color" variant="flat" size="80" class="mb-4">
              <v-icon :icon="benefit.icon" size="40" color="white" />
            </v-avatar>
            <div class="text-h5 font-weight-bold mb-3">{{ benefit.title }}</div>
            <div class="text-body-1 text-medium-emphasis" style="line-height: 1.8">
              {{ benefit.description }}
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center mt-12">
      <v-btn
        color="primary"
        size="x-large"
        class="text-none font-weight-bold rhadmin-cta-btn"
        prepend-icon="mdi-phone"
        href="#contact"
        style="padding: 16px 32px; font-size: 16px"
      >
        Contactez nos experts RH
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>
.benefits-section {
  background: linear-gradient(
    180deg,
    rgba(240, 238, 248, 0.3) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(240, 238, 248, 0.3) 100%
  );
  border-radius: 40px;
}

.benefit-card {
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 238, 248, 0.8) 100%);
  border: 2px solid rgba(107, 90, 224, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.benefit-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #6b5ae0 0%, #ff7a3c 100%);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.benefit-card:hover::before {
  transform: scaleX(1);
}

.benefit-card:hover {
  transform: translateY(-16px);
  box-shadow: 0 24px 80px rgba(107, 90, 224, 0.25);
  border-color: rgba(107, 90, 224, 0.3);
}

@media (max-width: 599px) {
  .rhadmin-cta-btn {
    font-size: 0.875rem !important;
  }
}
</style>
