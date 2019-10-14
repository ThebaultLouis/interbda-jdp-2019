<template>
  <div class="home text-xs-center">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <h2>Choisissez votre équipe</h2>
    <v-layout>
      <v-flex class="text-xs-right">
        <v-btn dark icon large @click="refreshEquipes">
          <v-icon large color="black">fa-sync</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-flex xs12 sm6 d-flex offset-sm3>
      <v-select
        :items="equipes"
        label="Equipe"
        item-text="name"
        item-value="_id"
        v-model="equipeForm"
        :attach="true"
      ></v-select>
    </v-flex>

    <div class v-if="equipeForm">
      <h3 class="text-sm-center my-4">Composition de {{ equipeSelect.name }}</h3>
      <v-flex sm6 offset-sm3>
        <v-card>
          <v-list>
            <v-list-tile v-for="participant in equipeSelect._participants" :key="participant._id">
              <v-list-tile-content>{{participant.nom + " " + participant.prenom}}</v-list-tile-content>
              <v-spacer></v-spacer>
              <v-list-tile-content>{{participant.ecole.name}}</v-list-tile-content>
              <v-spacer></v-spacer>
              <v-btn icon :class="participant.ecole.color">
                <v-icon color="white">favorite</v-icon>
              </v-btn>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>

      <h2 class="my-4">Détail de {{ equipeSelect._parcours.name }}</h2>
      <v-layout row wrap>
        <v-flex
          xs12
          sm5
          offset-sm1
          v-for="(etape, index) in equipeSelect._parcours.etapes"
          :key="etape.name"
          my-4
        >
          <v-card
            :class="index < equipeSelect.etapesRealisees ?  'green lighten-2' : 'red lighten-1'"
            class="text-xs-left"
          >
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{etape.name}}</h3>
                <div class="mt-1 subtitle-1" v-if="index < equipeSelect.etapesRealisees">
                  <span>{{"Realisé à " + getDate(equipeSelect.tempsRealises[index])}}</span>
                  <span
                    class="ml-2 pa-1 red title"
                    v-if="(index) in equipeSelect.etapesPassees"
                  >avec pénalité</span>
                </div>
                <br />
                <div>{{ etape.description }}</div>
                <br />
                <div>
                  <span>
                    <strong>MDP:</strong>
                    {{etape.code}}
                  </span>
                  <br />
                  <span>
                    <strong>Adresse:</strong>
                    {{etape.adresse}}
                  </span>
                </div>
                <br />
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
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
    Axios.get(`${config.apiUrl}/parcours`)
      .then(res => {
        // console.log(res)
        this.parcours = res.data.parcours;
      })
      .catch(e => this.console.log(e));
    Axios.get(`${config.apiUrl}/etape`)
      .then(res => {
        // console.log(res)
        this.etapes = res.data.etapes;
      })
      .catch(e => this.console.log(e));
    this.refreshEquipes();
  },
  components: {},
  data: () => ({
    parcours: [],
    parcoursForm: 0,
    etapesParcours: [],
    etapes: [],
    equipes: [],
    equipeForm: 0,
    equipeSelect: {}
  }),
  methods: {
    refreshEquipes() {
      Axios.get(`${config.apiUrl}/equipe`)
        .then(res => {
          // console.log(res)
          this.equipes = res.data.equipes;
        })
        .catch(e => this.console.log(e));
    },
    getDate(int) {
      var date = new Date(int);
      return date.getHours() + ":" + date.getMinutes();
    }
  },
  watch: {
    parcoursForm: function() {
      var parcoursActuel = this.parcours.find(e => e._id == this.parcoursForm);
      this.etapesParcours = this.etapes.filter(e =>
        parcoursActuel._etapes.includes(e._id)
      );
    },
    equipeForm: function() {
      this.equipeSelect = this.equipes.find(e => e._id == this.equipeForm);
      // console.log(this.equipeSelect)
    }
  }
};
</script>
