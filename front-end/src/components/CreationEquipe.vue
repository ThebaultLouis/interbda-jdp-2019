<template lang="html">
  <div>

    <h1 class="display-1 text-xs-center">Création d'équipe</h1>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
        <!-- <v-layout> -->
          <v-flex sm4 offset-sm4>
            <v-text-field
            v-model="equipe.name"
            label="Entrer le nom d'équipe"
            :rules="nameRules"
            required
            >
          </v-text-field>
        </v-flex>
      <!-- </v-layout> -->
        <v-flex sm4 offset-sm4>
          <v-select
          v-model="equipe.parcours"
            :attach="true"
            :items="parcours"
            item-text="name"
            item-value="_id"
            label="Selectionner le parcours">
          </v-select>
        </v-flex>

      <v-layout wrap>
        <v-flex text-xs-right>

        <v-btn
        color="green darken-1"
        icon
        large
        @click="addParticipant"
        >
        <v-icon color="white">fa-user-plus</v-icon>
      </v-btn>

      <v-btn
      color="red darken-1"
      icon
      large
      @click="deleteParticipant"
      >
      <v-icon color="white">fa-user-times</v-icon>
    </v-btn>
  </v-flex>

  </v-layout>
  <!-- <h2 class="headline my-4">Les participants</h2> -->

      <div class="my-2" v-for="(participant, index) in participants" :key="index">
        <h3 class="headline">Participant {{index + 1}}</h3>
        <v-layout wrap>
          <v-flex sm3 offset-sm1>
            <v-text-field
            v-model="participant.nom"
            label="Nom"
            >
          </v-text-field>
        </v-flex>
        <v-flex sm3 offset-sm1>
            <v-text-field
            v-model="participant.prenom"
            label="Prénom"
            >
          </v-text-field>
        </v-flex>
        <v-flex sm3 offset-sm1>
          <v-select
          v-model="participant.ecole"
            :attach="true"
            :items="ecoles"
            item-text="name"
            item-value="_id"
            label="école">
          </v-select>
        </v-flex>
      </v-layout>
      </div>


  <br class="my-4">
    <v-flex class="text-xs-center">
      <v-btn
      :disabled="!valid"
      color="amber"
      @click="validate"
      >
      Validate
    </v-btn>

    </v-flex>
    </v-form>
  </div>
</template>

<script>
import Axios from "axios";
import config from "@/config.js";

export default {
  name: "home",
  mounted() {
    Axios.get(`${config.apiUrl}/ecole`)
      .then(res => {
        this.ecoles = res.data.ecoles;
      })
      .catch(e => this.console.log(e));

    Axios.get(`${config.apiUrl}/parcours`)
      .then(res => {
        this.parcours = res.data.parcours;
      })
      .catch(e => this.console.log(e));
    this.initParticipants();
  },
  data: () => ({
    ecoles: [],
    parcours: [],
    participants: [],
    equipe: {
      name: "",
      parcours: ""
    },
    valid: true,
    nameRules: [v => !!v || "Un nom d'équipe est requis"]
  }),
  methods: {
    initParticipants() {
      this.participants = [];
      for (var i = 0; i < 1; i++) {
        // this.addParticipant()
        this.participants.push({
          nom: "",
          prenom: "",
          ecole: ""
        });
      }
    },
    addParticipant() {
      // console.log("click");
      this.participants.push({
        nom: "",
        prenom: "",
        ecole: ""
      });
    },
    deleteParticipant() {
      this.participants.pop();
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.participants.forEach(participant => {
          participant.ecole = this.ecoles.find(e => e._id == participant.ecole);
        });

        var body = {
          name: this.equipe.name,
          _participants: this.participants,
          _parcours: this.parcours.find(e => e._id == this.equipe.parcours)
        };
        // console.log(body)
        Axios.post(`${config.apiUrl}/equipe`, body)
          .then(res => {
            // console.log(res.data)
            this.initParticipants();
            this.equipe = {
              name: "",
              parcours: ""
            };
          })
          .catch(e => console.log(e));
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>
