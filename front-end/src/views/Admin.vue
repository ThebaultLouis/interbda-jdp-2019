<template lang="html">
  <div class="">


        <v-tabs v-model="tab" fixed-tabs centered color="brown" class="mb-4">
          <!-- <v-tabs-slider color="yellow"></v-tabs-slider> -->
          <v-tab class="white--text">Création</v-tab>
          <v-tab class="white--text">Recherche</v-tab>
          <v-tab class="white--text">Classement</v-tab>
        </v-tabs>

        <v-tabs-items class="px-3" v-model="tab">
          <v-tab-item>
            <CreationEquipe></CreationEquipe>
          </v-tab-item>
          <v-tab-item>
            <RechercheEquipe></RechercheEquipe>
          </v-tab-item>
          <v-tab-item>
            <ClassementGeneral></ClassementGeneral>
          </v-tab-item>
        </v-tabs-items>



  </div>
</template>

<script>
import CreationEquipe from "@/components/CreationEquipe.vue";
import RechercheEquipe from "@/components/RechercheEquipe.vue";
import ClassementGeneral from "@/components/ClassementGeneral.vue";

export default {
  name: "home",
  components: {
    CreationEquipe,
    RechercheEquipe,
    ClassementGeneral
  },
  data: () => ({
    tab: null
  })
};
</script>

<style lang="css" scoped>
</style>
