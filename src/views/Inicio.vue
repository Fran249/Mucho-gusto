<template>
  <div>
    <v-container fluid>
      
        <navBar/>
        <v-navigation-drawer
        fixed
        temporary
        right 
        v-model="carritoCompra"
        width="25%">
         <Carrito :key="componentKey"/>
        </v-navigation-drawer>
        <v-row>
        <v-col cols="12">
        <mainCont class="mainCont"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Carrito from '../components/Carrito.vue'
import navBar from '../components/navBar.vue'
import mainCont from '../components/mainCont.vue'
import store from '@/store';

export default {
  name: 'InicIo',
  components:{
    navBar,
    mainCont,
    Carrito,
  },
  data:()=>({
    componentKey: store.state.forceRenderCarrito,

  }),
 watch:{
  componentKey(){
    this.componentKey = store.state.forceRenderCarrito
    
  }
 },
 computed: {
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


.menuFilterSalados{
  margin-top: 80px;
  position: fixed;

}

</style>