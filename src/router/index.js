import Vue from 'vue'
import Router from 'vue-router'

// Views
import Lobby from '@/views/Lobby'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Lobby',
      component: Lobby
    }
  ]
})
