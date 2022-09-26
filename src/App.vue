<template>
  <v-app>
    <v-main>
    <div id="nav">
      
      <v-btn @click="dialog2 = true" v-if="!existeUsuario">Registro</v-btn> 
      <v-dialog v-model="dialog2" width="1000" transition="dialog-top-transition">
        <RegistroComponent/>
      </v-dialog>|
      <v-btn @click="dialog1 = true"  v-if="!existeUsuario">Ingreso</v-btn>
      <v-dialog v-model="dialog1" width="1000" transition="dialog-top-transition">
        <IngresoComponent/>
      </v-dialog>
      <router-link to="/inicio" v-if="existeUsuario">Inicio</router-link> |
      <router-link to="/Pagina" >Pagina</router-link> |
      <router-link to="/userView" v-if="existeUsuario">User</router-link> |
      <button @click="cerrarSesion" v-if="existeUsuario">Cerrar Sesión</button>
    </div>
    <router-view/>
    <v-navigation-drawer
          permanent
          expand-on-hover
          v-if="existeUsuario"
        >
          <v-list>
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
              </v-list-item-avatar>
            </v-list-item>
    
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{usuario.name}}
                </v-list-item-title>
                <v-list-item-subtitle>{{usuario.email}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <input type="text" v-model="nombre">
              <v-btn @click="cambiarNombre">
                cambiar
              </v-btn>
            </v-list-item>
          </v-list>
    
          <v-divider></v-divider>
    
          <v-list
            nav
            dense
          >
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-folder</v-icon>
              </v-list-item-icon>
              <v-list-item-title>My Files</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Shared with me</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-star</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Starred</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
  </v-main>
</v-app>
</template>

<script>

import { mapActions, mapGetters, mapState } from 'vuex'
import IngresoComponent from './components/IngresoComponent.vue'
import RegistroComponent from './components/RegistroComponent.vue'
import { getAuth, updateProfile } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig} from './firebase/index'


const auth = getAuth();
initializeApp(firebaseConfig);

export default {
  data: ()=>({
    
    dialog1 : false,
    dialog2 : false,
    nombre: '',
    items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        
  }),
  components:{
    IngresoComponent,
    RegistroComponent,
    
},

  methods:{
    ...mapActions(['cerrarSesion']),
    cambiarNombre(){
  updateProfile(auth.currentUser, {
    displayName: this.nombre, photoURL: "https://example.com/jane-q-user/profile.jpg"
  }).then(() => {
    // Profile updated!
    location.reload()
    // ...
  })
},
  },
  computed:{
    ...mapGetters(['existeUsuario']),
    ...mapState(['usuario']),
  }
}
</script>


<style lang="scss" >

  
</style>