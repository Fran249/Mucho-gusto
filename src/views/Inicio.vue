<template >
  <div >

      
        <navBar  />
        <v-navigation-drawer
        fixed
        temporary
        right
        touchless
        v-model="carritoCompra"
        :width="width()" >
         <Carrito :key="componentKey"/>
        </v-navigation-drawer>
        <mainCont class="mainCont"/>



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

  }),
 watch:{
  componentKey(){
    this.componentKey = store.state.forceRenderCarrito
    
  }
 },
 methods:{
  width(){
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
  width: 50%;
}



</style>