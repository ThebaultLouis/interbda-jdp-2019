import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Parcours from './views/Parcours.vue'
import Admin from './views/Admin.vue'
import Bravo from './views/Bravo.vue'
import Help from './views/Help.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/parcours',
      name: 'parcours',
      component: Parcours
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/bravo',
      name: 'bravo',
      component: Bravo
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
