<template>
  <div>

      
        <navBar />
        <v-navigation-drawer
        fixed
        temporary
        right
        touchless
        v-model="carritoCompra"
        width="25%" >
         <Carrito :key="componentKey"/>
        </v-navigation-drawer>
        <v-row>
        <v-col cols="12">
        <mainCont class="mainCont"/>
        </v-col>
      </v-row>


  </div>
</template>

<script>
import Carrito from '../components/Carrito.vue'
import navBar from '../components/navBar.vue'
import mainCont from '../components/mainCont.vue'
import store from '@/store';
import { mapState , mapGetters } from 'vuex'

export default {
  name: 'InicIo',
  components:{
    navBar,
    mainCont,
    Carrito,
  },
  data:()=>({
    componentKey: store.state.forceRenderCarrito,
    width : window.innerWidth

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




</style>