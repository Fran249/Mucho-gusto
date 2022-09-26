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
    </v-main>
  </v-app>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import IngresoComponent from './components/IngresoComponent.vue'
import RegistroComponent from './components/RegistroComponent.vue'


export default {
  data: ()=>({
    
    dialog1 : false,
    dialog2 : false,
  }),
  components:{
    IngresoComponent,
    RegistroComponent,
    
},

  methods:{
    ...mapActions(['cerrarSesion'])
  },
  computed:{
    ...mapGetters(['existeUsuario'])
  }
}
</script>


<style lang="scss" >

  
</style>