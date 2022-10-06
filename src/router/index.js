

import Vue from 'vue'

import { initializeApp } from 'firebase/app';
import { firebaseConfig} from '../firebase/index'
import { getAuth} from "firebase/auth";

const auth = getAuth();
initializeApp(firebaseConfig);
import VueRouter from 'vue-router'
import store from '@/store';


Vue.use(VueRouter)

const routes = [

  {
    path: '/inicIo',
    name: 'InicIo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Inicio.vue'),
    
  },
  {
    path: '/pagina',
    name: 'pagina',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pagina.vue')
  },
  {
    path: '/adminView',
    name: 'adminView',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue'),
    beforeEnter: (to,from, next) => {
      if( store.state.rol == 'admin'){
        next()
      }else if ( store.state.usuario.rol == null){
        next('/error')
      }else if (store.state.usuario.rol == 'user'){
        next('/error')
      }
        next();

    },
  },
  {
    path: '/userView',
    name: 'userView',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue'),
    meta: {
      requiresAuth : true
    }
  },
  {
    path: '/MisCompras',
    name: 'MisCompras',
    component: () => import(/* webpackChunkName: "about" */ '../views/MisCompras.vue'),
    meta: {
      requiresAuth : true
    }
  }
]



const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {

  if(to.matched.some(record => record.meta.requiresAuth)){
    const usuario = auth.currentUser
    //const role = store.state.rol
    //console.log(usuario, role)

    if (!usuario) {
      next({
        path: '/pagina'
      })
    } else {
      next()
    }
  }else {
    next()
  }
})

export default router
