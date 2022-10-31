<template>
  <div>
    <v-container fluid>
        
        <navBar/>
        <v-row>
          <v-col cols="2" v-if="width > 960">
            <div class="menu-cont">
              <menuFilterPanificados class="menuFilterPanificados"/>
            </div>
          </v-col>
        <v-col cols="12" lg="10" sm="5" xl="10">
        <mainContPanificados class="mainContPanificados" />
        </v-col>
      </v-row>
    </v-container>
    <v-navigation-drawer
        fixed
        temporary
        right 
        v-model="carritoCompra"
        touchless
        width="25%">
         <Carrito :key="componentKey"/>
        </v-navigation-drawer>
  </div>
</template>

<script>
import Carrito from '../components/Carrito.vue'
import navBar from '../components/navBar.vue'
import menuFilterPanificados from '../components/menuFilterPanificados.vue'
import store from '@/store';
import mainContPanificados from '@/components/mainContPanificados.vue';
import { mapState , mapGetters } from 'vuex'

export default {
  name: 'InicIo',
  components:{
    navBar,
    menuFilterPanificados,
    Carrito,
    mainContPanificados
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

.menu-cont{
  height: 100%;
  width: 16%;
  position: fixed;
  overflow-y: auto;

}

</style>