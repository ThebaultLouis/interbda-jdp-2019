<template lang="html">
  <div class="">

    <v-navigation-drawer
         v-model="drawer"
         clipped
         fixed
         app
         class="purple lighten-4"
       >
       <v-list dense class="purple lighten-4">
         <!-- <v-list-tile v-for="n in 3" :key="n">

         </v-list-tile> -->
         <br class="my-4">
          <v-list-tile
            v-for="(item, index) in items"
            :key="index"
            @click="$router.push(item.link)"
          >
            <v-list-tile-action class="title">{{ item.title }}</v-list-tile-action>
          </v-list-tile>
        </v-list>
       </v-navigation-drawer>

       <v-toolbar app fixed clipped-left class="purple lighten-1">
         <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
         <v-toolbar-title>
           <v-btn flat
           @click="$router.push('/')">
           InterBDA 2019
         </v-btn>
         </v-toolbar-title>

         <v-spacer></v-spacer>

           <v-toolbar-items class="hidden-sm-and-down">
             <v-btn flat v-for="(item, index) in items"
             :key="index"
             @click="$router.push(item.link)">
             {{item.title}}
           </v-btn>
         </v-toolbar-items>
       </v-toolbar>

  </div>
</template>




<script>
export default {
  name: "Navbar",
  data: () => ({
    showMenu: false,
    drawer: null,
     items: [
       { title: "Accueil",
          link: "/"},
       { title: "Commencer L'aventure",
          link: "/parcours"},
       { title: "besoin d'aide ?",
          link: "/help" },
       { title: "Admin",
          link: "/admin" }

     ]
   })
}
</script>

<style lang="css" scoped>

</style>
