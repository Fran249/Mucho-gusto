<template>
  <div>
    <v-container fluid>
      
        <navBar/>
        <v-navigation-drawer
        fixed
        temporary
        right 
        v-model="carritoCompra"
        touchless
        width="25%">
         <Carrito :key="componentKey"/>
        </v-navigation-drawer>
        <v-row>
          <v-col cols="2" v-if="width > 960">
            <div class="menu-cont">
              <menuFilterDulces class="menuFilterDulces"/>
            </div>
          </v-col>
        <v-col cols="12" lg="9" sm="5" xl="4">
        <mainContDulces class="mainContDulces" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Carrito from '../components/Carrito.vue'
import navBar from '../components/navBar.vue'
import menuFilterDulces from '../components/menuFilterDulces.vue'
import store from '@/store';
import mainContDulces from '@/components/mainContDulces.vue';
import { mapState , mapGetters } from 'vuex'

export default {
  name: 'InicIo',
  components:{
    navBar,
    menuFilterDulces,
    Carrito,
    mainContDulces
},
  data:()=>({
    componentKey: store.state.forceRenderCarrito,
    width: window.innerWidth

  }),
 watch:{
  componentKey(){
    this.componentKey = store.state.forceRenderCarrito
    
  }
 },
 computed: {
  ...mapState(['usuario']),
  ...mapGetters(['existeUsuario']),
  carritoCompra: {
        get () {
          return store.state.carrito
        },
        set (value) {
          store.commit('toggleCarrito', value)
        }
      },
 }

}
</script>

<style lang="scss" scoped>

.menu-cont{
  height: 100%;
  position: fixed;
  overflow-y: auto;
  width: 17.8%;

}
.menu-cont::-webkit-scrollbar {
    -webkit-appearance: none;
}

.menu-cont::-webkit-scrollbar:vertical {
    width:10px;
}

.menu-cont::-webkit-scrollbar-button:increment,.contenedor::-webkit-scrollbar-button {
    display: none;
} 

.menu-cont::-webkit-scrollbar:horizontal {
    height: 10px;
}

.menu-cont::-webkit-scrollbar-thumb {
    background-color: #797979;
    border-radius: 20px;
    border: 2px solid #f1f2f3;
}

.menu-cont::-webkit-scrollbar-track {
    border-radius: 10px;  
}
.menuFilterDulces{
  width: 100%;
}
@media only screen and (max-width: 1400px){
  .menu-cont{
  height: 450px;
  position: fixed;
  overflow-y: auto;

}

}
</style>