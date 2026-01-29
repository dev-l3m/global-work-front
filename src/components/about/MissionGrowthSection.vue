<script setup lang="ts"></script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-10">
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">
        Votre croissance libérée des contraintes RH
      </div>
    </div>

    <v-row>
      <v-col cols="12">
        <v-card class="pa-8 growth-content-card" variant="outlined" elevation="2">
          <div class="text-body-1 text-medium-emphasis mb-4" style="line-height: 1.8">
            Concrètement, notre mission est de vous permettre de vous concentrer à 100% sur votre
            cœur de métier.
          </div>
          <div class="text-body-1 text-medium-emphasis mb-4" style="line-height: 1.8">
            Nous transformons l'externalisation, souvent perçue comme un risque, en un atout fiable
            et sécurisé. Nous prenons en charge la complexité du sourcing, la gestion administrative
            internationale et le suivi managérial.
          </div>
          <div class="text-body-1 text-medium-emphasis" style="line-height: 1.8">
            La mission de Global Work Hub est de bâtir des ponts humains et professionnels durables,
            pour que votre croissance ne soit plus jamais freinée par un manque de ressources.
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.growth-content-card {
  border-radius: 20px;
  transition: all 0.3s ease;
  border-left: 4px solid rgb(var(--v-theme-primary));
}

.growth-content-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}
</style>
