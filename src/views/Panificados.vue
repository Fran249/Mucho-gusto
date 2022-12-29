<template>
  <div>
    <v-container fluid>
        
        <navBar/>
        <v-img height="250"  src="../assets/Panificados.jpg">

</v-img>
        <v-row>
          <v-col cols="2" v-if="width > 960">
            <div class="menu-cont">
              <menuFilterPanificados class="menuFilterPanificados"/>
            </div>
          </v-col>

        <v-col cols="12" lg="10" sm="5" xl="10">
        <mainContPanificados class="mainContPanificados" />

        </v-col>
        <FootEr/>
      </v-row>
    </v-container>
    <v-navigation-drawer
        fixed
        temporary
        right 
        v-model="carritoCompra"
        touchless
        :width="widthPercent()">
         <Carrito :key="componentKey"/>
        </v-navigation-drawer>
  </div>
</template>

<script>
import Carrito from '../components/Carrito.vue'
import navBar from '../components/navBar.vue'
import menuFilterPanificados from '../components/menuFilterPanificados.vue'
import FootEr from '@/components/Footer.vue';
import store from '@/store';
import mainContPanificados from '@/components/mainContPanificados.vue';
import { mapState , mapGetters } from 'vuex'

export default {
  name: 'InicIo',
  components:{
    navBar,
    menuFilterPanificados,
    Carrito,
    mainContPanificados,
    FootEr
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
 methods:{
  widthPercent(){
    if(window.innerWidth >960){
        return '25%'
    }else {
      return '100%'
    }
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
.container{
  padding: 2px;
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

.menu-cont{
  height: 75%;
  width: 16%;
  position: absolute;
  overflow-y: auto;

}

</style>