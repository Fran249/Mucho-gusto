import Vue from 'vue'
import VueRouter from 'vue-router'
import {auth} from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/inicIo',
    name: 'InicIo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Inicio.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pagina',
    name: 'pagina',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pagina.vue')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    const usuario = auth.currentUser
    //console.log(usuario)

    if (!usuario) {
      next({
        path: '/ingreso'
      })
    } else {
      next()
    }

  } else {
    next()
  }
})

export default router
