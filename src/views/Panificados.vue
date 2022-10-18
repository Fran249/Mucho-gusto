<template>
  <div>
    <v-container fluid>
        
        <navBar/>
        <v-navigation-drawer
        fixed
        temporary
        right 
        v-model="carritoCompra">
         <Carrito :key="componentKey"/>
        </v-navigation-drawer>
        <v-row>
          <v-col cols="3">
            <menuFilterPanificados class="menuFilterPanificados"/>
          </v-col>
        <v-col cols="9">
        <mainContPanificados class="mainContPanificados" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Carrito from '../components/Carrito.vue'
import navBar from '../components/navBar.vue'
import menuFilterPanificados from '../components/menuFilterPanificados.vue'
import store from '@/store';
import mainContPanificados from '@/components/mainContPanificados.vue';

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


.menuFilterPanificados{
  margin-top: 80px;
  position: fixed;

}

</style>