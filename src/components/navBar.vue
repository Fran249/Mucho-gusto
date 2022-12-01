<template>
  <div>
   <v-app-bar
    app
    color="#000"
    fixed
    height="150"
    width="100%"
    class="appbar"
   >
   <v-col cols="3" lg="4" md="4" xl="4" class="pa-0">
      <div class="container-registro-ingreso-avatar">

        <div class="registro-ingreso1" >
          <v-btn width="50" height="50" text tile x-small class="mt-4 mr-2" href="https://mucho-gusto-web.web.app/">
            <v-img src="https://i.imgur.com/6Xwvw8Y.png" width="50" height="50" contain class="mt-3">
            </v-img>
          </v-btn>  
        <v-btn class="mt-5" text fab @click="navDraw = true" v-if="existeUsuario">
          <v-avatar>
            <v-img :src="usuario.foto"></v-img>
          </v-avatar>
        </v-btn>
        
        </div>
        <div class="registro-ingreso2" v-if="!existeUsuario && width > 960">
          <v-btn text @click="dialog1 = true"  v-if="!existeUsuario" color="#FEBF2C">
          <p class="mt-3 registro-ingreso">
            INGRESO
          </p>
        </v-btn>

        <v-dialog  v-if="!existeUsuario" v-model="dialog1" width="500" transition="dialog-top-transition">
          <IngresoComponent/>
        </v-dialog>
          <v-btn text @click="dialog2 = true" v-if="!existeUsuario" color="#FEBF2C">
            <p class="mt-3 registro-ingreso">
              REGISTRO
            </p>
          </v-btn>
        <v-dialog v-if="!existeUsuario" v-model="dialog2" width="500" transition="dialog-top-transition">
          <RegistroComponent/>
        </v-dialog>

      </div>
    </div>
    </v-col>
    <v-col cols="4" lg="4" md="4" xl="4">

        <div class="buscador_vue">
          <v-text-field
          v-if="width > 960"
          class="mt-7"
          label="¿Que estas buscando?"
          solo
          rounded
          v-model="filtro"
          >
      </v-text-field>
      <div class="d-flex justify-end mb-4" v-if="width < 960">
            <div>
              <v-menu style="position: absolute;" v-model="busqueda" :close-on-content-click="false" >
            <v-text-field
            heigth="100px"
            class="mt-7 ml-10 fab-transition"
            label="¿Que estas buscando?"
            solo
            rounded
            v-model="filtro">
            </v-text-field>
          </v-menu>
              <v-btn rounded @click="busqueda = true" width="100%" height="50px" class="ml-10"> 
            <p style="color: grey;" class="mt-3">¿Que estas buscando?</p>
                <v-icon color="grey" class="ml-3">
                  mdi-search-web
              </v-icon>
          </v-btn>

            </div>
        </div>
      </div>
      <div class="rutas-sabores">
          <router-link class="link" style="text-decoration: none; color: inherit;" to="/" >
            <v-btn text color="white">
               <p class="mt-3">Inicio</p>
            </v-btn>
            </router-link>
            <v-divider vertical color="white" inset class="mb-2"></v-divider>  
            <router-link class="link" style="text-decoration: none; color: inherit;" to="/dulces" >
              <v-btn text color="white">
                <p class="mt-3">Dulces</p>
            </v-btn>
            </router-link>
            <v-divider vertical color="white" inset class="mb-2"></v-divider>  
            <router-link class="link" style="text-decoration: none; color: inherit;" to="/salados" >
              <v-btn text color="white">
                <p class="mt-3">Salados</p>
            </v-btn>
            </router-link>
            <v-divider vertical color="white" inset class="mb-2"></v-divider>  
            <router-link class="link" style="text-decoration: none; color: inherit;"  to="/panificados" >
              <v-btn text color="white">
                <p class="mt-3">Panificados</p>
            </v-btn>
          </router-link>
        </div>
    </v-col>
      <v-col cols="4" lg="4" md="4" xl="4">
          <div class="container-cart-mg">
            <div class="cart-mg">
              <v-badge
              v-if="existeUsuario && usuario.rol === 'user'"
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
          <div class="container-registro-ingreso-avatar" v-if="!existeUsuario && width < 960">
        <div class="registro-ingreso1" v-if="existeUsuario && width > 960">

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

        <v-dialog  v-if="!existeUsuario" v-model="dialog1" width="500" transition="dialog-top-transition">
          <IngresoComponent/>
        </v-dialog>
          <v-btn text @click="dialog2 = true" v-if="!existeUsuario" color="#FEBF2C">
            <p class="mt-3 registro-ingreso">
              REGISTRO
            </p>
          </v-btn>
        <v-dialog v-if="!existeUsuario" v-model="dialog2" width="500" transition="dialog-top-transition">
          <RegistroComponent/>
        </v-dialog>

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
          width="275px"
          
        >
       <div class="close">
        <v-btn text icon @click="navDraw = false">
            <v-icon >
              mdi-close
            </v-icon>
          </v-btn>
        </div>
          <v-list
            nav
            dense
            class="list-nav-draw"
          >

          <v-list-item v-if="existeUsuario">
              <router-link style="text-decoration: none; color: inherit;" to="/userView" >
                <v-btn text  color="#727272" >
                  <v-icon class="mr-2">
                  mdi-account
                  </v-icon>
                  <p class="title-draw mt-3">Mi Perfil</p>
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
            <v-list-item v-if="existeUsuario && usuario.rol == 'admin'" >
              <router-link style="text-decoration: none; color: inherit;" to="/compras" >
                <v-btn text  color="#727272" >
                  <v-icon class="mr-2">
                    mdi-cart
                  </v-icon>
                  <p class="title-draw mt-3">Compras</p>
                </v-btn>
              </router-link>
            </v-list-item>
            <v-list-item v-else>
              <router-link style="text-decoration: none; color: inherit;" to="/misCompras" >
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
            texto: '',
            width: window.innerWidth,
            busqueda: false,
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
      },
      filtro: {
        get(){
          return this.texto
        },
        set(value){

          value = value.toLowerCase();
          store.commit('filterValue',value)
          console.log(value)
          store.commit('forceRenderCarrito', + 1)
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


.list-nav-draw{
 margin-top: 150px;
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
.link.exact-active .v-btn p {
  color: #f2c04a;
}

.close{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  
}


@media only screen and (max-width: 960px){
  .rutas-sabores{
    
    transform: scale(0.7);
    margin-left: 50%;

  }
  .container-registro-ingreso-avatar{
    transform: scale(0.6);
    margin-right: 150%;
  }
  .buscador_vue{
    transform: scale(0.5);
    margin-top: 45px;
    margin-right: 50%;
    width: 140px;
    
  }
  .registro-ingreso2{
    transform: scale(0.9);
    flex-direction: row;
  }

  .container-cart-mg{
    transform: scale(0.5);
    margin-left: 150%;
  }

}
  
</style>