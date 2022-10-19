<template>
  <div>
   <v-app-bar
    app
    color="#000"
    hide-on-scroll
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
          <v-btn text @click="dialog2 = true" v-if="!existeUsuario" color="#FEBF2C">Registro</v-btn>
        <v-dialog v-model="dialog2" width="500" transition="dialog-top-transition">
          <RegistroComponent/>
        </v-dialog>
        <v-btn text @click="dialog1 = true"  v-if="!existeUsuario" color="#FEBF2C">Ingreso</v-btn>

        <v-dialog v-model="dialog1" width="500" transition="dialog-top-transition">
          <IngresoComponent/>
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
          <router-link style="text-decoration: none; color: inherit;" to="/" >
            <v-btn text color="white">
               <p class="mt-3">Inicio</p>
            </v-btn>
            </router-link>
            <v-divider vertical color="white" inset class="mb-2"></v-divider>  
            <router-link style="text-decoration: none; color: inherit;" to="/dulces" >
              <v-btn text color="white">
                <p class="mt-3">Dulces</p>
            </v-btn>
            </router-link>
            <v-divider vertical color="white" inset class="mb-2"></v-divider>  
            <router-link style="text-decoration: none; color: inherit;" to="/salados" >
              <v-btn text color="white">
                <p class="mt-3">Salados</p>
            </v-btn>
            </router-link>
            <v-divider vertical color="white" inset class="mb-2"></v-divider>  
            <router-link style="text-decoration: none; color: inherit;" to="/panificados" >
              <v-btn text color="white">
                <p class="mt-3">Panificados</p>
            </v-btn>
          </router-link>
        </div>
      </div>
    </v-col>
      <v-col cols="4">
          <div class="container-cart-mg">
            <div class="cart-mg">
              <v-badge
              v-if="existeUsuario"
              color="green"
              overlap
              class="mt-3"
              :content="notif"
              :value="notif">
                <v-btn  v-if="existeUsuario " @click.stop="carritoCompra = !carritoCompra" width="160" outlined color="white" >
                  <v-icon size="20px" class="mr-2">
                    mdi-briefcase
                  </v-icon>
                  <p class="mt-4">MIS COMPRAS</p>
                </v-btn>
              </v-badge>
            </div>
          </div>
        </v-col>
    </v-app-bar>
          <v-navigation-drawer
          
          v-model="navDraw"
          class="drawer-nav"
          v-if="existeUsuario"
          temporary
          app
          
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
    
          <v-divider></v-divider>
    
          <v-list
            nav
            dense
          >
            <v-list-item>
              <v-btn text @click="cerrarSesion" v-if="existeUsuario" color="#FEBF2C">Cerrar Sesión</v-btn>
            </v-list-item>
            <v-list-item>
              <router-link style="text-decoration: none; color: inherit;" to="/adminView" >
                <v-btn text v-if="existeUsuario && usuario.rol == 'admin'" color="#FEBF2C">
                  Control de Stock
                </v-btn>
              </router-link>
            </v-list-item>
            <v-list-item>
              <router-link style="text-decoration: none; color: inherit;" to="/userView" >
                <v-btn text v-if="existeUsuario" color="#FEBF2C">
                  Mi Perfil
                </v-btn>
              </router-link>
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

.drawer-nav{
  background: rgb(0,0,0);
background: linear-gradient(140deg, rgb(0, 0, 0) 37%, rgba(255, 255, 255, 0) 100%);
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
</style>