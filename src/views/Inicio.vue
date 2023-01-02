<template>
  <div>
    
    <navBarAdminVue v-if="existeUsuario && usuario.rol == 'admin'"/>
    <navBar v-else/>
    <v-navigation-drawer
      fixed
      temporary
      right
      touchless
      v-model="carritoCompra"
      :width="width()"
    >
      <Carrito :key="componentKey" />
    </v-navigation-drawer>
      <!--<v-img  height="300" src="../assets/ContenidoMain/8.jpg">
        <div style="width: 100%; height:100%; " class="d-flex justify-center align-center">
            <v-img contain width="150" height="150" src="../assets/ContenidoMain/4.png"></v-img>
        </div>
      </v-img>-->
      <v-carousel 
    id="v-carousel"
    hide-delimiter-background
    show-arrows-on-hover
    :height="Carouselheight()"
    cycle
    interval="5000"
    
      >
      
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      >
      <div v-if="item.index == 1" style="width: 100%; height:100%; " class="d-flex justify-center align-center">
            <v-img v-if="widthImg > 700" contain width="150" height="150" src="../assets/ContenidoMain/4.png"></v-img>
            <v-img v-else contain width="70" height="70" src="../assets/ContenidoMain/4.png"></v-img>
        </div>
      </v-carousel-item>
    </v-carousel>
    <mainCont class="mainCont" />
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
    <v-icon color="green" size="30">
      mdi-whatsapp
    </v-icon>
  </v-btn>
    <Footer class="footer" />

  </div>
</template>

<script>
import navBarAdminVue from "@/components/navBarAdmin.vue";
import Carrito from "../components/Carrito.vue";
import navBar from "../components/navBar.vue";
import mainCont from "../components/mainCont.vue";
import Footer from "../components/Footer.vue";
import store from "@/store";
import { mapState, mapGetters } from "vuex";

export default {
  name: "InicIo",
  components: {
    navBar,
    navBarAdminVue,
    mainCont,
    Carrito,
    Footer,
  },
  data: () => ({
    mobileViewSmall: false,
    componentKey: store.state.forceRenderCarrito,
    items: [
      {src: require('../assets/ContenidoMain/8.jpg'),
        index: 1}
    ],
    widthImg: window.innerWidth,
  }),
  watch: {
    componentKey() {
      this.componentKey = store.state.forceRenderCarrito;
    },
  },
  methods: {
    mobileViewFunctionSmall(){
        
        this.mobileViewSmall = window.innerWidth <= 500;
        console.log('mobile version')
    },
    width() {
      if (window.innerWidth > 960) {
        return "25%";
      } else {
        return "100%";
      }
    },
    Carouselheight(){
      if(window.innerWidth < 700){
        return  100
      }else if(window.innerWidth > 700) {
        return 500
      }
    }
  },
  created(){
      this.mobileViewFunctionSmall();
          },
  computed: {
    ...mapState(["usuario"]),
    ...mapGetters(["existeUsuario"]),
    carritoCompra: {
      get() {
        return store.state.carrito;
      },
      set(value) {
        store.commit("toggleCarrito", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 50%;
}

</style>
