import Vue from 'vue'
import Vuex from 'vuex'

import { getAuth, createUserWithEmailAndPassword ,} from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firestore = getFirestore();
const auth = getAuth();
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: null,
    error: null,
    
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

  },
  actions: {
    
     getRol(uid){

      const docuRef = doc(firestore, `Usuarios/${uid}`);
      const docuCifrada =  getDoc(docuRef);
      const infoFinal = docuCifrada.data().rol;
      return infoFinal;
    
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

          setDoc(docuRef, {correo : usuario.email, rol: 'user'})


          sendEmailVerification(auth.currentUser)
          .then(() => {
          // Email verification sent!
          // ...
          });
          //console.log(usuario)
          alert('Enviamos un mail de confirmacion.')
          location.reload()
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

          async function getRol(uid){

            const docuRef = doc(firestore, `Usuarios/${uid}`);
            const docuCifrada = await getDoc(docuRef);
            const infoFinal = docuCifrada.data().rol;
            return infoFinal;
          
          }
          getRol(usuario.uid).then((rol)=>{
            const userData = {
              uid: usuario.uid,
              email: usuario.email,
              rol: rol,
            }
      
            

            if(auth.currentUser.emailVerified  ){
            
              commit('setUsuario', usuario);
              commit('setRol', userData.rol)
              console.log(this.state.rol)
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