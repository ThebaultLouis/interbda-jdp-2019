<template lang="html">
  <div class="">
    <div>
      <v-img src="/virtuoze/Index.png" contain>
        <div class="aventure">
          <v-btn @click="$router.push('/parcours')" class="aventure_texte" flat>Commencer l'aventure</v-btn>
          
        </div>
        <div class="aide">
          <v-btn @click="$router.push('/help')" class="aide_texte" flat>Besoin d'aide</v-btn>
        </div>
      </v-img>
    </div>
    
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
.aventure {
  position: absolute;
  margin-top: 51%;

  transform: rotate(-10deg);
}
.aventure_texte {
  font-size: 18px;
}
.aide {
  position: absolute;
  margin-top: 90%;
  margin-left: 8%;

  transform: rotate(12deg);
}
.aide_texte {
  font-size: 16px;
}
</style>
