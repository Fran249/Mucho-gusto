import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import IngresoComponent from '@/components/navComponents/IngresoComponent.vue'
import RegistroComponent from '@/components/navComponents/RegistroComponent.vue'

Vue.component('IngresoComponent', IngresoComponent)
Vue.component('RegistroComponent', RegistroComponent)


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
      // eslint-disable-next-line no-unused-vars
      const userData = {
        uid: user.uid,
        email: user.email,
        rol: rol,
      }

      

      store.dispatch('detectarUsuario', {email: user.email, uid: user.uid, rol, name: user.displayName, foto: user.photoURL});
      
      
      //console.log("userData final", userData)
    })
   
    } else {
      router.push('/pagina')
    }
  }
)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
