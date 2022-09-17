import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



Vue.config.productionTip = false

import {auth} from './firebase'

auth.onAuthStateChanged(user => {
  if(user && user.emailVerified){
    //console.log(user)
    store.dispatch('detectarUsuario', {email: user.email, uid: user.uid})
    }else{

      router.push('/pagina')
    }
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
