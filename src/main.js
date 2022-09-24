import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



Vue.config.productionTip = false

import {auth} from './firebase'
import vuetify from './plugins/vuetify'
import { getFirestore, doc, getDoc } from "firebase/firestore";
const firestore = getFirestore();


async function getRol(uid){

  const docuRef = doc(firestore, `Usuarios/${uid}`);
  const docuCifrada = await getDoc(docuRef);
  const infoFinal = docuCifrada.data().rol;
  return infoFinal;

}



auth.onAuthStateChanged(user => {
  if(user && user.emailVerified){
  
    
    getRol(user.uid).then((rol)=>{
      const userData = {
        uid: user.uid,
        email: user.email,
        rol: rol,
      }

      console.log("userData final", userData)

      store.dispatch('detectarUsuario', {email: user.email, uid: user.uid, rol});
      
    
    })
    
    
    }
  }
)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
