<script setup lang="ts">
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Recrutement IT': 'primary',
    Flexibilité: 'secondary',
    Qualité: 'success',
    Support: 'info',
    Économies: 'warning',
    Sécurité: 'error',
  }
  return colors[category] || 'primary'
}

const testimonials = [
  {
    quote:
      'Global Work Hub a transformé notre approche du recrutement international. En quelques semaines, nous avons pu déployer une équipe complète de développeurs qualifiés. Leur accompagnement RH est remarquable.',
    author: 'Sophie Martin',
    role: 'Directrice RH',
    company: 'TechCorp France',
    rating: 5,
    category: 'Recrutement IT',
  },
  {
    quote:
      "La flexibilité et la réactivité de Global Work Hub sont exceptionnelles. Nous avons pu ajuster nos effectifs rapidement selon nos besoins, sans les contraintes du recrutement local. Un vrai gain de temps et d'argent.",
    author: 'Marc Dubois',
    role: 'CEO',
    company: 'StartupInnov',
    rating: 5,
    category: 'Flexibilité',
  },
  {
    quote:
      "Ce qui nous a convaincus, c'est la qualité des profils proposés et leur encadrement. Chaque talent est suivi individuellement, ce qui garantit une performance optimale. Nous recommandons vivement leurs services.",
    author: 'Julie Bernard',
    role: 'Responsable Opérations',
    company: 'E-commerce Pro',
    rating: 5,
    category: 'Qualité',
  },
  {
    quote:
      'Global Work Hub simplifie le recrutement international et nous permet de déployer rapidement des équipes performantes, sans ajouter de complexité RH. Leur équipe est toujours disponible pour répondre à nos questions.',
    author: 'Thomas Leroy',
    role: 'Directeur Technique',
    company: 'Digital Solutions',
    rating: 5,
    category: 'Support',
  },
  {
    quote:
      "Nous avons économisé près de 40% sur nos coûts de recrutement tout en améliorant la qualité de nos équipes. L'accompagnement personnalisé fait toute la différence.",
    author: 'Marie Dupont',
    role: 'CFO',
    company: 'FinanceGroup',
    rating: 5,
    category: 'Économies',
  },
  {
    quote:
      'La conformité juridique et la sécurité des données sont impeccables. Nous avons une totale confiance dans leur structure européenne et leur approche professionnelle.',
    author: 'Pierre Moreau',
    role: 'Directeur Juridique',
    company: 'LegalTech',
    rating: 5,
    category: 'Sécurité',
  },
]
</script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-12">
      <div class="text-overline text-primary font-weight-bold mb-2">Témoignages clients</div>
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">Ils nous font confiance</div>
      <div class="text-body-1 text-medium-emphasis mx-auto" style="max-width: 700px">
        Découvrez les retours authentiques de nos clients sur leur expérience avec Global Work Hub.
      </div>
    </div>

    <v-row>
      <v-col
        v-for="(testimonial, index) in testimonials"
        :key="index"
        cols="12"
        md="6"
        lg="4"
        class="testimonial-col"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.12,
          threshold: 0.15,
        }"
      >
        <v-card class="pa-6 testimonial-card" elevation="2">
          <div class="d-flex align-start ga-3 mb-4">
            <v-icon icon="mdi-format-quote-open" size="40" color="primary" />
            <div class="text-body-1 testimonial-quote flex-grow-1">
              «&nbsp;{{ testimonial.quote }}&nbsp;»
            </div>
          </div>

          <div class="d-flex align-center ga-2 mb-3">
            <v-chip size="small" :color="getCategoryColor(testimonial.category)" variant="tonal">
              {{ testimonial.category }}
            </v-chip>
            <div class="d-flex ga-1">
              <v-icon
                v-for="i in testimonial.rating"
                :key="i"
                icon="mdi-star"
                size="16"
                color="warning"
              />
            </div>
          </div>

          <v-divider class="my-4" />

          <div class="d-flex align-center ga-3">
            <v-avatar color="primary" variant="tonal" size="48">
              <v-icon icon="mdi-account" />
            </v-avatar>
            <div class="flex-grow-1">
              <div class="text-body-2 font-weight-bold">{{ testimonial.author }}</div>
              <div class="text-caption text-medium-emphasis">
                {{ testimonial.role }} - {{ testimonial.company }}
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.testimonial-col {
  animation: fadeInUp 0.6s ease-out both;
}

.testimonial-card {
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 238, 248, 0.95) 100%);
  border: 1px solid rgba(107, 90, 224, 0.1);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.testimonial-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(107, 90, 224, 0.2);
  border-color: #6b5ae0;
}

.testimonial-quote {
  line-height: 1.8;
  font-style: italic;
  color: rgba(0, 0, 0, 0.87);
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
</style>
