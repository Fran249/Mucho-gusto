import Vue from 'vue'
import Vuex from 'vuex'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";



import router from '@/router';


const firestore = getFirestore();
const auth = getAuth();
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: null,
    error: null,
    carrito: false,
    sendNotif: 0,
    carritoCompras: [],
    filterState: '',
    forceRenderCarrito: 0,
    filterValue: '',
    valorDescuento : '',    
  },
  getters: {
    existeUsuario(state){
      if(state.usuario === null){
          return false
      }else{
          return true
      }
    },
    active: (state) => {
      return state.carrito;
    },
    array: (state) => {
      return state.carritoCompras;
    }
  },
  mutations: {
    setUsuario(state, payload){
      state.usuario = payload
    },
    setError(state, payload){
      state.error = payload
    },
    toggleCarrito: (state, value) => (state.carrito = value),
    sendNotif: (state, value) => (state.sendNotif = value),
    filterState: (state, value) => (state.filterState = value),
    carritoCompras: (state, value) => (state.carritoCompras = value),
    forceRenderCarrito: (state, value) => (state.forceRenderCarrito = value),
    filterValue: (state, value) => (state.filterValue = value),

    valorDescuento: (state, value) => (state.valorDescuento = value),
  },
  actions: {

    toggleCarrito({ commit }, value) {
      commit("toggleCarrito", value);
    },
    sendNotif({commit},value){
      commit("sendNofit", value);
    },
    filterState({commit},value){
      commit("filterState", value);
    },
    carritoCompras({commit},value){
      commit("carritoCompras", value);
    },
    forceRenderCarrito({commit},value){
      commit("forceRenderCarrito", value);
    },
    filterValue({ commit }, value) {
      commit("filterValue", value);
    },
    valorDescuento({ commit }, value) {
      commit("valorDescuento", value);
    },
    crearUsuario({commit}, usuario){
      createUserWithEmailAndPassword(auth, usuario.email, usuario.password)
        .then(res => {

  
 
          
          // eslint-disable-next-line no-unused-vars
          const usuario = {
            email: res.user.email,
            uid: res.user.uid,
          }
          console.log(usuario)

          const docuRef = doc( firestore , `Usuarios/${usuario.uid}`);

          setDoc(docuRef, {correo : usuario.email, rol: 'user', nombreCompleto: '', direccion: '', dni:'', telefonoContacto: '' })

         
          
          
        })
        .catch(error => {
          console.log(error)
          commit('setError', error)
        })

    
       setTimeout(timeOut, 2500);

      function timeOut() {
        sendEmailVerification(auth.currentUser)
        .then(() => {
          // Email verification sent!
          
          // ...
        });
        alert('enviamos un correo de verificacion')
        location.reload()
      }


    },
    
  
    ingresoUsuario({commit}, usuario){
      signInWithEmailAndPassword(auth ,usuario.email, usuario.password)
      
      .then(res => {

 



          const usuario = {
              email: res.user.email,
              uid: res.user.uid,
              name: res.user.displayName
          }

          async function getRol(uid){

            const docuRef = doc(firestore, `Usuarios/${uid}`);
            const docuCifrada = await getDoc(docuRef);
            const infoFinal = docuCifrada.data().rol;
            return infoFinal;
          
          }
          getRol(usuario.uid).then((rol)=>{
            // eslint-disable-next-line no-unused-vars
            const userData = {
              uid: usuario.uid,
              email: usuario.email,
              rol: rol,
             
            }
            
            

            if(auth.currentUser.emailVerified  ){



              commit('setUsuario', usuario);
              
        
              location.reload()
  
            }
             else if (!auth.currentUser.emailVerified){
  
              alert('Verifica tu Correo.')
  
            }
        })
          }).catch(error => {
            console.log(error)
            commit('setError', error)
        })




  },
    detectarUsuario({commit}, usuario){
      commit('setUsuario', usuario)
      router.push('/MuchoGustoCompras')
  // eslint-disable-next-line no-unused-vars
  },
  
  cerrarSesion({commit}){
    signOut(auth).then(() => {
      // Sign-out successful.
      commit('setUsuario', null)
      router.push('/')
      
      
    })
},
  
  

  },
  modules: {
  }
})
