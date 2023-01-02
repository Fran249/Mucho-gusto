<template>
  <div>
    <v-container fluid>
      <v-navigation-drawer
        fixed
        temporary
        right
        touchless
        v-model="carritoCompra"
        :width="widthPercent()">
         <Carrito :key="componentKey"/>
        </v-navigation-drawer>
        <navBar/>
        <v-img height="250"  src="../assets/Salados.jpg">

</v-img>
        <v-row>
          <v-col cols="2" v-if="width > 960">
            <div class="menu-cont">
            <menuFilterSalados class="menuFilterSalados" />
            </div>
          </v-col>
          <v-col cols="12" lg="10" sm="5" xl="10">
        <mainContSalados class="mainCont" />

        </v-col>
        <v-btn
      v-if="
          !mobileViewSmall"
      elevation="9"
      fab
      fixed
      right
      bottom
      color="white"
    >
    <v-img src="../assets/WhatsAppVerde.png" contain width="30" height="30" >

    </v-img>
  </v-btn>
          <Footer/>

      </v-row>

    </v-container>

  </div>
</template>

<script>
import Carrito from '../components/Carrito.vue'
import navBar from '../components/navBar.vue'
import menuFilterSalados from '../components/menuFilterSalados.vue'
import Footer from '@/components/Footer.vue';
import store from '@/store';
import mainContSalados from '@/components/mainContSalados.vue';
import { mapState , mapGetters } from 'vuex'

export default {
  name: 'InicIo',
  components:{
    navBar,
    menuFilterSalados,
    Carrito,
    mainContSalados,
    Footer
},
  data:()=>({
    mobileViewSmall: false,
    componentKey: store.state.forceRenderCarrito,
    width: window.innerWidth
  }),
 watch:{
  componentKey(){
    this.componentKey = store.state.forceRenderCarrito
    
  }
 },
 methods:{
  mobileViewFunctionSmall(){
        
        this.mobileViewSmall = window.innerWidth <= 500;
        console.log('mobile version')
    },
  widthPercent(){
    if(window.innerWidth >960){
        return '25%'
    }else {
      return '100%'
    }
  }
 },
 created(){
      this.mobileViewFunctionSmall();
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
  padding: 2px
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
.row{margin: 0;}
.menu-cont::-webkit-scrollbar-track {
    border-radius: 10px;  
}

.menu-cont{
  height: 50%;
  width: 100%;
  position: relative;
  overflow-y: auto;

}
.menuFilterSalados{
  width: 100%;
}
@media only screen and (max-width: 1400px){
    .menu-cont{
    
    height: 450px;
    position: relative;
    overflow-y: auto;

  }
}
</style>