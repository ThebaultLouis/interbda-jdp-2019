<template lang="html">
   <div>
      <v-img src="/virtuoze/Aventure.png" contain>
        <div class="help">
          <div class="titre">Félicitation</div>
          <div class="felicitation my-3">Vous avez terminé <br> le jeu de piste !</div>
          <v-btn class="ml-5" flat @click="$router.push('/')">Accueil</v-btn>
        </div>
      </v-img>
    </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
.help {
  margin-top: 50%;
  margin-left: 27%;
}
.titre {
  font-weight: bold;
  font-size: 25px;
}
.felicitation {
  font-size: 15px;
}
</style>
