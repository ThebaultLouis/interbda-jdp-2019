<template lang="html">
  <div class="histoire">
    
     <div>
       <v-card>
            <v-img
              src="/virtuoze/Histoire.png"
              class="black--text"
            >
              <v-card-title
                class="fill-height align-center justify-center"
                
              >
              <v-form v-if="showForm"
            ref="form"
            v-model="valid"
            lazy-validation

            >
            <v-layout column wrap>
              <v-flex xs6>
                <v-text-field
                v-model="formEquipe"
                label="Nom d'équipe"
                :rules="nameRules"
                required
                >
              </v-text-field>
              </v-flex>
              <v-flex xs4 offset-xs4>
              <v-btn
              :disabled="!valid"
              color="brown"
              @click="validate"
              >
              Valider
            </v-btn>
                
              </v-flex>

          </v-layout>
          </v-form>
          <div v-if="equipe">
  <div >
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1  pa-5>

            <div class="mt-5">
              <h3 class="title mb-0">{{etapeActuel.name}}</h3>
              
              <div class="subtitle-1 mt-1 mb-2"> {{ etapeActuel.adresse }} </div>
              
              <div v-if="equipe.etapesRealisees != equipe._parcours.etapes.length - 1" class="body-1" v-html="etapeActuel.description"></div>
              <div v-else class="body-1">
                <div class="mb-2">Pour trouver le coupable, vous aurez besoin de la première lettre de chaque mot de passe que vous avez trouvé pendant le jeu de piste et de ce message crypté : <span class="font-weight-bold"> {{ etapeActuel.description }} </span></div>
                <div v-for="(etape) in equipe._parcours.etapes.slice(0, equipe._parcours.etapes.length - 1).filter(e => e.code)" :key="etape.code">
                  - {{etape.code}}
                </div>
              </div>
              <br>
              <v-form
              ref="codeForm"
              v-model="codeValid"
              lazy-validation
              >
              <v-layout wrap>
                <v-flex sm3 offset-sm1>
                  <v-text-field
                  v-model="code"
                  label="Code"
                  :rules="codeRules"
                  required
                  >
                </v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
              <v-btn
              :disabled="!codeValid"
              color="amber"
              @click="validateCode"
              >
              C'est mon dernier mot
            </v-btn>
          </v-layout>
              <v-layout wrap>
               
              <v-spacer></v-spacer>
               <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="red"
          dark
          v-on="on"
        >
          abandonner
        </v-btn>
      </template>
      <v-card>
           <v-card-title
          class="headline "
          primary-title
        >
          Voulez-vous vraiment abandonner ?
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Annuler
          </v-btn>
           <v-btn
              color="red"
              @click="skipStep"
              >
              J'abandonne
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
              <!-- <v-btn
              color="red"
              @click="skipStep"
              >
              J'abandonne
            </v-btn> -->
          </v-layout>
        </v-form>

            </div>

      </v-flex>
    </v-layout>
  </div>

</div>
              </v-card-title>
            </v-img>

          </v-card>
      
    </div>
</div>





</template>

<script>
import Axios from "axios";
import config from "@/config.js";

export default {
  data: () => ({
    dialog: false,
    formEquipe: "",
    equipe: null,
    erreur: "",
    parcours: {},
    etapeActuel: {},
    code: "",
    codeValidate: false,
    showForm: true,
    valid: true,
    codeValid: true,
    name: "",
    fin: false,
    nameRules: [v => !!v || "Name is required"],
    codeRules: [v => !!v || "Vous n'avez pas dit votre dernier mot"]
  }),

  methods: {
    testCode(code) {
      var n = Number(code);
      return n !== n;
    },

    validate() {
      if (this.$refs.form.validate()) {
        // this.snackbar = true
        // console.log(this.formEquipe);
        if (this.formEquipe == "bda") {
          this.$router.push("/");
        }
        Axios.get(`${config.apiUrl}/equipe/name`, {
          params: {
            name: this.formEquipe
          }
        })
          .then(res => {
            if (res.data.err) {
              this.formEquipe = "";
              this.nameRules = [v => !!v || res.data.err];
            } else {
              // console.log(res.data)
              this.equipe = res.data;
              this.parcours = this.equipe._parcours;

              this.showForm = false;

              // console.log(this.equipe)
              if (this.equipe.parcoursTermine) {
                this.$router.push("/bravo");
              } else {
                // var derniereEtape = this.parcours._etapes.find(
                //   e =>
                //     e._id ==
                //     this.equipe.etapesRealisees[
                //       this.equipe.etapesRealisees.length - 1
                //     ]._id
                // );
                // // console.log(derniereEtape);
                // this.etapeActuel = this.parcours._etapes.find(
                //   e => e._id == derniereEtape.prochaineEtape
                // );
                this.etapeActuel = this.parcours.etapes[
                  this.equipe.etapesRealisees
                ];
              }
              // this.etapeActuel =
            }
          })
          .catch(e => console.log(e));
      }
    },
    validateCode() {
      if (this.$refs.codeForm.validate()) {
        if (this.code == this.etapeActuel.code) {
          Axios.patch(`${config.apiUrl}/equipe/${this.equipe._id}`).then(
            res => {
              // console.log(res.data)
              this.equipe = res.data;
              if (this.equipe.parcoursTermine) {
                this.$router.push("/bravo");
              }
              this.etapeSuivante();
            }
          );
        } else {
          this.code = "";
          this.codeRules = [v => !!v || "Ce n'est pas le bon code"];
        }
      }
    },
    etapeSuivante() {
      this.etapeActuel = this.parcours.etapes[this.equipe.etapesRealisees];
      this.codeValidate = false;
      this.code = "";
      this.codeRules = [v => !!v || ""];
    },
    skipStep() {
      this.dialog = false;
      Axios.patch(`${config.apiUrl}/equipe/skip/${this.equipe._id}`).then(
        res => {
          // console.log(res.data)
          this.equipe = res.data;
          if (this.equipe.parcoursTermine) {
            this.$router.push("/bravo");
          }
          this.etapeSuivante();
        }
      );
    }
  }
};
</script>

<style lang="css" scoped>
.histoire {
  font-weight: bold;
}
</style>
