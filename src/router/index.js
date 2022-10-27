

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
    path: '/',
    name: 'InicIo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Inicio.vue'),
  },
  {
    path: '/salados',
    name: 'salados',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Salados.vue'),
  },
  {
    path: '/panificados',
    name: 'panificados',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Panificados.vue'),
  },
  {
    path: '/dulces',
    name: 'dulces',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Dulces.vue'),
  },
  {
    path: "/user/:username/compra",
    name: "compras",
    props: true,
    meta: {
      requiresAuth : true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/confirmBuy.vue')
  },
  {
    path: '/agregar',
    name: 'agregarView',
    component: () => import(/* webpackChunkName: "about" */ '../views/agregarView.vue'),
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
    path: '/stock',
    name: 'stockView',
    component: () => import(/* webpackChunkName: "about" */ '../views/stockView.vue'),
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
]



const router = new VueRouter({
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
})
router.beforeEach((to, from, next) => {

  if(to.matched.some(record => record.meta.requiresAuth)){
    const usuario = auth.currentUser
    //const role = store.state.rol
    //console.log(usuario, role)

    if (!usuario) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }else {
    next()
  }
})

export default router
