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
   <div class="app-bar-container">
    <div class="general-appbar">

    <div class="rutas-sabores">
      <v-btn text fab @click="navDraw = true" v-if="existeUsuario">
        <v-avatar>
          <v-img :src="usuario.foto"></v-img>
        </v-avatar>
      </v-btn>
        <v-btn text @click="dialog2 = true" v-if="!existeUsuario" color="#FEBF2C">Registro</v-btn>
      <v-dialog v-model="dialog2" width="500" transition="dialog-top-transition">
        <RegistroComponent/>
      </v-dialog>
      <v-btn text @click="dialog1 = true"  v-if="!existeUsuario" color="#FEBF2C">Ingreso</v-btn>

      <v-dialog v-model="dialog1" width="500" transition="dialog-top-transition">
        <IngresoComponent/>
      </v-dialog>
      </div>
        <div class="buscador_vue">
          <v-text-field
          class="mt-7"
          label="Buscar Producto"
          solo
          rounded
          full-width
        >
      </v-text-field>
        <v-btn icon>
            <v-icon color="white">
              mdi-search-web
            </v-icon>
        </v-btn>
        </div>
          <div class="cart-mg">
            <v-badge
            v-if="existeUsuario"
            color="green"
            overlap
            class="mt-3"
            :content="notif"
            :value="notif">
              <v-btn  v-if="existeUsuario " @click.stop="carritoCompra = !carritoCompra" rounded color="black" dark >
                <v-icon size="30px" class="mr-2">
                  mdi-briefcase
                </v-icon>
                Mis compras
              </v-btn>
            </v-badge>
            <v-btn v-else disabled x-small>
              <v-img src="https://i.imgur.com/6Xwvw8Y.png" width="50" height="50" contain>

              </v-img>
            </v-btn>
          </div>
      </div>
      <div class="rutas-sabores">
        <v-btn text disabled color="#FEBF2C" v-if="!existeUsuario">
            Inicio
         </v-btn>
        <router-link style="text-decoration: none; color: inherit;" to="/" >
          <v-btn text color="#FEBF2C">
            Inicio
         </v-btn>
        </router-link>
        <v-divider vertical color="#FEBF2C"></v-divider>
        <router-link style="text-decoration: none; color: inherit;" to="/dulces" >
          <v-btn text color="#FEBF2C">
            Dulces
         </v-btn>
        </router-link>
        <v-divider vertical color="#FEBF2C"></v-divider>
        <router-link style="text-decoration: none; color: inherit;" to="/salados" >
          <v-btn text color="#FEBF2C">
            Salados
         </v-btn>
        </router-link>
        <v-divider vertical color="#FEBF2C"></v-divider>  
        <router-link style="text-decoration: none; color: inherit;" to="/panificados" >
          <v-btn text color="#FEBF2C">
            Panificados
         </v-btn>
        </router-link>
        <v-btn text color="#FEBF2C" disabled v-if="existeUsuario">
         </v-btn>
      </div>
    </div>
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
.drawer-nav{
  background: rgb(0,0,0);
background: linear-gradient(140deg, rgb(0, 0, 0) 37%, rgba(255, 255, 255, 0) 100%);
}
.h3-name{
  color: #fff
}
.app-bar-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
}
.general-appbar{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rutas-sabores{
  margin-left: px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.buscador_vue{
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.registro-ingreso{
  display: flex;
}
</style>