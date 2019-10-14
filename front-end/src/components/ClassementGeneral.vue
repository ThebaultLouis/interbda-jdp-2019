<template lang="html">
  <div class="">
      <!-- <h1 class="title my-4 text-xs-center">Classement général des équipes</h1> -->
      <v-flex class="text-xs-right">
        <v-btn
        dark
        icon
        large
        @click="refreshEquipes"
        >
        <v-icon large color="black">fa-sync</v-icon>
      </v-btn>
    </v-flex>



  <v-layout row>
  <v-flex xs12 sm12 v-if="equipes.length">
    <div class="my-3" v-for="(parcoursEquipe, index) in equipes" :key="index" v-if="parcoursEquipe">
      <div class="title mb-2"> Parcours {{ index + 1 }} </div>
    <v-card>
      <div v-for="(item, index) in parcoursEquipe"
        :key="item.name"  >
        <div class="pa-2">
          
            <v-layout align-center>
              <!-- <v-flex xs2>
                <v-icon v-if="index < 3" :color="rank(index)" class="mr-4">fa-medal</v-icon>
              </v-flex> -->
                <v-flex>
                  <span class="title">
                  {{item.name}}
                  </span>
                  </v-flex>
            </v-layout>
            <div class="my-1">
              {{ getTime(item.tempsRealises)}}
              <span v-if="item.etapesPassees.length">avec {{ item.etapesPassees.length }} pénalités</span>
            </div>
            <div class="grey--text">
               <span v-for="(p, index) in item._participants" :key="p._id">{{p.nom + " " + p.prenom}}  <span v-if="index < item._participants.length - 1">{{ " | " }} </span></span>
             
            </div>
             <!-- <v-icon v-if="index < 3" :color="rank(index)" class="mr-4">fa-medal</v-icon>
              <span v-else class="mr-5"></span>
              {{item.name}} -->
          
        </div>
</div>
     
    </v-card>
    </div>
  </v-flex>
  <v-flex xs12 v-else>
    <v-card>
      <v-card-title primary-title>
        <div>
         <h3 class="display-1 mb-4">Aucune équipe n'a terminé le jeu de piste pour l'instant</h3>

        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</v-layout>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import config from '@/config.js'
import Axios from "axios";
import config from "@/config.js";

export default {
  name: "home",
  mounted() {
    this.refreshEquipes();
  },
  components: {},
  data: () => ({
    equipes: [[], [], []]
  }),
  methods: {
    refreshEquipes: function() {
      Axios.get(`${config.apiUrl}/equipe/classement`)
        .then(res => {
          var teams = res.data.equipes;
          for (var i = 0; i < teams.length; i++) {
            this.equipes[teams[i]._parcours.index].push(teams[i]);
          }

          for (var i = 0; i < 3; i++) {
            this.equipes[i].sort(
              (a, b) => this.getIntervalle(a) > this.getIntervalle(b)
            );
          }
        })
        .catch(e => this.console.log(e));
    },
    getIntervalle(equipe) {
      var date1 = equipe.tempsRealises[0];
      var date2 = equipe.tempsRealises[equipe.tempsRealises.length - 1];
      return date2 - date1;
    },
    date(date) {
      if (!date) {
        return "Parcours non terminé";
      }
      var afficher = new Date(date);
      var heures = Number(afficher.getHours()) - 1;
      var minutes = Number(afficher.getMinutes());
      return heures + "h " + minutes + "min";
    },
    getTime(temps) {
      if (!temps) {
        return "Parcours non terminé";
      }
      var date1 = temps[0];
      var date2 = temps[temps.length - 1];
      return this.date(date2 - date1);
    },
    tempsTotal(item) {
      if (!item.finParcours) {
        return "Parcours non terminé";
      }
      var afficher = new Date(item.finParcours - item.debutParcours);
      var heures = Number(afficher.getHours()) - 1;
      var minutes = Number(afficher.getMinutes());
      return heures + "h" + minutes + "min";
    },
    rank(index) {
      switch (index) {
        case 0:
          return "yellow";
        case 1:
          return "grey";
        case 2:
          return "brown";
        default:
          return "purple";
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>
