<script setup lang="ts"></script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-10">
      <div class="text-overline text-primary font-weight-bold mb-2">SOURCING INTERNATIONAL</div>
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">
        Global Work Hub : la mission de piloter vos ressources humaines
      </div>
    </div>

    <v-row>
      <v-col cols="12">
        <v-card class="pa-8 mission-content-card" variant="outlined" elevation="2">
          <div class="text-body-1 text-medium-emphasis mb-4" style="line-height: 1.8">
            Notre mission ne s'arrête pas à la simple mise en relation. Elle commence là où la
            plupart des plateformes RH s'arrêtent.
          </div>
          <div class="text-body-1 text-medium-emphasis mb-4" style="line-height: 1.8">
            Nous croyons fermement que le succès d'un <strong>recrutement international</strong> ne
            repose pas seulement sur la compétence technique du profil, mais avant tout sur son
            intégration, son engagement et son <strong>accompagnement RH</strong> au quotidien.
          </div>
          <div class="text-body-1 text-medium-emphasis" style="line-height: 1.8">
            C'est pourquoi notre mission principale est de fournir une
            <strong>externalisation RH</strong> entièrement pilotée. Nous ne vous "livrons" pas un
            CV ; nous intégrons à votre organisation un collaborateur engagé, que nous encadrons
            pour garantir sa performance et sa <strong>stabilité</strong>. Nous gérons activement sa
            montée en compétences et son bien-être, assurant ainsi une collaboration long terme et
            prévenant les ruptures de mission.
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.mission-content-card {
  border-radius: 20px;
  transition: all 0.3s ease;
  border-left: 4px solid rgb(var(--v-theme-primary));
}

.mission-content-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}
</style>
