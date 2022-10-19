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
          <v-col cols="2">
            <div class="menu-cont">
              <menuFilterDulces class="menuFilterDulces"/>
            </div>
          </v-col>
        <v-col cols="9">
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

.menuFilterDulces{
  margin-top: 80px;
  position: fixed;

}
.menu-cont{
  height: 500px;

  position: fixed;
  overflow-y: auto;

}

</style>