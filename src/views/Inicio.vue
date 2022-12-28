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
      <v-img  height="300" src="../assets/ContenidoMain/8.jpg">
        <div style="width: 100%; height:100%; " class="d-flex justify-center align-center">
            <v-img contain width="150" height="150" src="../assets/ContenidoMain/4.png"></v-img>
        </div>
      </v-img>
    <mainCont class="mainCont" />
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
    componentKey: store.state.forceRenderCarrito,
  }),
  watch: {
    componentKey() {
      this.componentKey = store.state.forceRenderCarrito;
    },
  },
  methods: {
    width() {
      if (window.innerWidth > 960) {
        return "25%";
      } else {
        return "100%";
      }
    },
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
