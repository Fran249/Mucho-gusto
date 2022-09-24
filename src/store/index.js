import Vue from 'vue'
import Vuex from 'vuex'

import { getAuth, createUserWithEmailAndPassword ,} from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import router from '../router'
const firestore = getFirestore();
const auth = getAuth();
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: null,
    error: null,
    rol: null,
  },
  getters: {
    existeUsuario(state){
      if(state.usuario === null){
          return false
      }else{
          return true
      }
    }
  },
  mutations: {
    setUsuario(state, payload){
      state.usuario = payload
    },
    setError(state, payload){
      state.error = payload
    },
    setRol(state, payload){
      state.rol = payload
    }
  },
  actions: {
    
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

          setDoc(docuRef, {correo : usuario.email, rol: 'user'})


          sendEmailVerification(auth.currentUser)
          .then(() => {
          // Email verification sent!
          // ...
          });
          //console.log(usuario)
          alert('Enviamos un mail de confirmacion.')
          
        })
        .catch(error => {
          console.log(error)
          commit('setError', error)
        })
  
    },
    ingresoUsuario({commit}, usuario){
      signInWithEmailAndPassword(auth ,usuario.email, usuario.password)
      
      .then(res => {
        
          const usuario = {
              email: res.user.email,
              uid: res.user.uid,
             
          }

          if(auth.currentUser.emailVerified){
          
          
            
            commit('setUsuario', usuario)
            
           
            router.push('/inicIo')
            location.reload()
          } else if (!auth.currentUser.emailVerified){
            alert('Verifica tu Correo.')
          }
      })
      .catch(error => {
          console.log(error)
          commit('setError', error)
      })
  },
    detectarUsuario({commit}, usuario){
      commit('setUsuario', usuario)
  
  // eslint-disable-next-line no-unused-vars
  },
  cerrarSesion({commit}){
    signOut(auth).then(() => {
      // Sign-out successful.
      commit('setUsuario', null)
      
    })
}
  

  },
  modules: {
  }
})
