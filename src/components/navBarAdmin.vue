<template>
  <div>
   <v-app-bar
    app
    color="#000"
    fixed
    height="150px"
    width="100%"
    class="appbar"
   >
   <v-col cols="4">
      <div class="container-registro-ingreso-avatar">
        <v-btn width="50" height="50" text tile x-small class="mt-6 mr-2" href="https://mucho-gusto-web.web.app/">
            <v-img src="https://i.imgur.com/6Xwvw8Y.png" width="50" height="50" contain>
            </v-img>
          </v-btn>  
        <div class="registro-ingreso1" v-if="existeUsuario">

        <v-btn class="mt-5" text fab @click="navDraw = true" v-if="existeUsuario">
          <v-avatar>
            <v-img :src="usuario.foto"></v-img>
          </v-avatar>
        </v-btn>
        
        </div>
        <div class="registro-ingreso2" v-if="!existeUsuario">
          <v-btn text @click="dialog1 = true"  v-if="!existeUsuario" color="#FEBF2C">
          <p class="mt-3 registro-ingreso">
            INGRESO
          </p>
        </v-btn>

        <v-dialog v-model="dialog1" width="500" transition="dialog-top-transition">
          <IngresoComponent/>
        </v-dialog>
          <v-btn text @click="dialog2 = true" v-if="!existeUsuario" color="#FEBF2C">
            <p class="mt-3 registro-ingreso">
              REGISTRO
            </p>
          </v-btn>
        <v-dialog v-model="dialog2" width="500" transition="dialog-top-transition">
          <RegistroComponent/>
        </v-dialog>

      </div>
    </div>
    </v-col>
    <v-col cols="4">
      <div class="container-buscador-sabores">
        <div class="buscador_vue">
          <v-text-field
          class="mt-7"
          label="¿Que estas buscando?"
          solo
          rounded
          full-width
          >
      </v-text-field>
      </div>
      <div class="rutas-sabores">
            <router-link class="link" style="text-decoration: none; color: inherit;" to="/agregar" >
              <v-btn text color="white">
                <p class="mt-3">Agregar</p>
            </v-btn>
            </router-link>
            <v-divider vertical color="white" inset class="mb-2"></v-divider>  
            <router-link class="link" style="text-decoration: none; color: inherit;" to="/stock" >
              <v-btn text color="white">
                <p class="mt-3">Stock</p>
            </v-btn>
            </router-link>
        </div>
      </div>
    </v-col>
      <v-col cols="4">
          
        </v-col>
    </v-app-bar>
          <v-navigation-drawer
          
          v-model="navDraw"
          class="drawer-nav"
          v-if="existeUsuario"
          temporary
          app
          width="275px"
          
        >
          <v-list>
            <v-list-item class="px-2">
              <v-list-item-avatar >
                <v-img :src="usuario.foto" ></v-img>
              </v-list-item-avatar>
            </v-list-item>
    
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title >
                  <h3 class="h3-name">
                    {{usuario.name}}
                  </h3>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
    
          <v-divider width="85%" class="ml-3 mb-10"></v-divider>
    
          <v-list
            nav
            dense
          >
          <v-list-item v-if="existeUsuario">
              <router-link style="text-decoration: none; color: inherit;" to="/userView" >
                <v-btn text  color="#727272" >
                  <v-icon class="mr-2">
                  mdi-account
                  </v-icon>
                  <p class="title-draw mt-3">Mi Cuenta</p>
                </v-btn>
              </router-link>
            </v-list-item>
            <v-list-item v-if="existeUsuario && usuario.rol == 'admin'" >
              <router-link style="text-decoration: none; color: inherit;" to="/stock" >
                <v-btn text color="#727272">
                  <v-icon class="mr-2">
                    mdi-tune
                  </v-icon>
                  <p class="title-draw mt-3">Control de Stock</p>
                </v-btn>
              </router-link>
            </v-list-item>
            <v-list-item v-else>
              <router-link style="text-decoration: none; color: inherit;" to="/" >
                <v-btn text  color="#727272" >
                  <v-icon class="mr-2">
                    mdi-cart
                  </v-icon>
                  <p class="title-draw mt-3">Registro de Compra</p>
                </v-btn>
              </router-link>
            </v-list-item>
            <v-divider width="85%" class="ml-3 mb-10 mt-10"></v-divider>
            <v-list-item v-if="existeUsuario">
              <v-btn text @click="cerrarSesion"  color="#727272">
                <p class="title-draw mt-3">CERRAR SESIÓN</p>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
    </div>

</template>


<script>


import store from '@/store';

import { mapActions, mapGetters, mapState } from 'vuex'


    export default {
        data: ()=>({
            name: 'navBar',

            components:{

            },
            products : '',
            dialog1 : false,
            dialog2 : false,
            navDraw: false,
            email: '',
        }),
        methods:{
    ...mapActions(['cerrarSesion']),
  },
  mounted(){

      },
  computed:{
    ...mapGetters(['existeUsuario']),
    ...mapState(['usuario']),
    carritoCompra: {
        get () {
          return store.state.carrito
        },
        set (value) {
          store.commit('toggleCarrito', value)
        }
      },
      notif: {
        get () {
          return store.state.sendNotif
        },
        set (value) {
          store.commit('sendNotif', value)
        }
      }
  },
  
    }
</script>


<style lang="scss" scoped>

@font-face{
    font-family: humanst521-1;
    src: url('/src/assets/Humanst521LtBTLight.ttf');
    };
    @font-face{
    font-family:humanst521-2;
    src: url('/src/assets/Humanst521LtBTLight.ttf');
    };
    @font-face{
    font-family: humans521-3;
    src: url('/src/assets/Hum521Rm.ttf');
    }
    @font-face {
    font-family: 'humanst521_btroman';
    src: url('/src/assets/hum521rm-webfont.woff2') format('woff2'),
         url('/src/assets/hum521rm-webfont.woff') format('woff');
    
    
    }



.v-btn {
  text-transform:none !important;
}
p{
  font-family: humanst521-1;
  font-size: 15px;
}
.title-draw{
  font-family: humanst521-1;
  font-weight: bold;
  font-size: 16px;
}
.registro-ingreso{
  font-family: humanst521-2;
  font-size: 16px;
}

.drawer-nav{
  background: rgb(0,0,0);
background-color: rgb(234,232,232,0.95);
}
.h3-name{
  color: #fff
}
.cart-mg{
  display: flex;
}

.rutas-sabores{
  display: flex;
  justify-content: center;
  column-gap: 1rem;
  align-items: center;
}
.buscador_vue{
  width: 100%;
  
}
.registro-ingreso1{
  display: flex;
  height: 100%;
  margin-bottom: 1rem;
}
.registro-ingreso2{
  display: flex;
  height: 100%;
  margin-top: 30px;
  margin-bottom: 1rem;
}

.container-cart-mg{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15%;
}
.container-registro-ingreso-avatar{
  display: flex;
  align-items: flex-start;
  margin-bottom: 15%;
}
.link.active .v-btn p {
  color: #f2c04a;
}

</style>