<template>
  <div>
    <div>
   <v-app-bar class="appbar" color="#000"
   fixed
   height="75px"
   >
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
      
        <router-link style="text-decoration: none; color: inherit;" to="/inicio" >
          <v-btn text color="#FEBF2C">
            Inicio
         </v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <v-badge
        color="green"
        overlap
        class="mr-5 mt-3"
        :content="notif"
        :value="notif">
          <v-btn text v-if="existeUsuario " @click.stop="carritoCompra = !carritoCompra" color="#FEBF2C" icon>
            <v-icon size="30px">
              mdi-cart-outline
            </v-icon>
          </v-btn>
        </v-badge>
          <div class="d-flex flex-row align-center">
          <v-text-field
          class="mt-7"
          label="Buscar Producto"
          solo
          rounded
        >

      </v-text-field>
        <v-btn icon>
            <v-icon color="white">
              mdi-search-web
            </v-icon>
        </v-btn>
        </div>
    </v-app-bar>
      
    </div>
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
            
            dialog1 : false,
            dialog2 : false,
            navDraw: false,
            email: '',
        }),
        methods:{
    ...mapActions(['cerrarSesion']),
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
  }
    }
</script>


<style lang="scss" scoped>
.drawer-nav{
  background: rgb(0,0,0);
background: linear-gradient(140deg, rgb(0, 0, 0) 37%, rgba(255, 255, 255, 0) 100%);
}
.h3-email{
  color: #fff
}
.h3-name{
  color: #fff
}
.col-secciones{
  height: 20px;
}
.col-secciones1{
  height: 55px;
}

</style>