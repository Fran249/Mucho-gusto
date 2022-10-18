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
            <menuFilterSalados class="menuFilterSalados"/>
          </v-col>
        <v-col cols="9">
        <mainContSalados class="mainCont" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Carrito from '../components/Carrito.vue'
import navBar from '../components/navBar.vue'
import menuFilterSalados from '../components/menuFilterSalados.vue'
import store from '@/store';
import mainContSalados from '@/components/mainContSalados.vue';

export default {
  name: 'InicIo',
  components:{
    navBar,
    menuFilterSalados,
    Carrito,
    mainContSalados
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