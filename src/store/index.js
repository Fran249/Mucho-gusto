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
    carritoCompras:[],
    
  },
  getters: {
    existeUsuario(state){
      if(state.usuario === null){
          return false
      }else{
          return true
      }
    },
  },
  mutations: {
    setUsuario(state, payload){
      state.usuario = payload
    },
    setError(state, payload){
      state.error = payload
    },
    setCarrito(state, payload){
      state.carritoCompras = payload
    },

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
              name: res.user.display
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
      router.push('/inicio')
  // eslint-disable-next-line no-unused-vars
  },
  
  cerrarSesion({commit}){
    signOut(auth).then(() => {
      // Sign-out successful.
      commit('setUsuario', null)
      location.reload()
      
      
    })
},
  
  

  },
  modules: {
  }
})
