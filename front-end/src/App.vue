<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <!-- <Navbar></Navbar> -->
    <v-container class="pa-0" fluid>
      <router-view />
    </v-container>

    <!-- <v-content>
      <v-container>
      </v-container>
    </v-content>-->

    <!-- <v-footer color="purple" class="hidden-sm-and-up">
         <span class="white--text">&copy; 2019 Interbda</span>
   </v-footer>
       <v-footer color="purple" app class="hidden-xs-only">
         <span class="white--text">&copy; 2019 Interbda</span>
    </v-footer>-->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
// import Footbar from '@/components/Footbar'

export default {
  name: "",
  data: () => ({}),
  components: {
    Navbar
    // Footbar
  }
};
</script>

<style>
</style>
