<template>
  <div>
   <v-app-bar>
      <v-btn text @click="navDraw = true" v-if="existeUsuario">
        <v-avatar>
          <v-img :src="usuario.foto"></v-img>
        </v-avatar>
      </v-btn>
      <v-btn @click="dialog2 = true" v-if="!existeUsuario">Registro</v-btn> 
      <v-dialog v-model="dialog2" width="1000" transition="dialog-top-transition">
        <RegistroComponent/>
      </v-dialog>|
      <v-btn @click="dialog1 = true"  v-if="!existeUsuario">Ingreso</v-btn>
      <v-dialog v-model="dialog1" width="1000" transition="dialog-top-transition">
        <IngresoComponent/>
      </v-dialog>
      <router-link to="/inicio" v-if="existeUsuario">Inicio</router-link> |
      <router-link to="/Pagina" >Pagina</router-link> |
      <router-link to="/userView" v-if="existeUsuario">User</router-link> |
      <button @click="cerrarSesion" v-if="existeUsuario">Cerrar Sesión</button>
    </v-app-bar>
    
    <v-navigation-drawer
          
          v-model="navDraw"
          
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
    
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{usuario.name}}
                </v-list-item-title>
                <v-list-item-subtitle>{{usuario.email}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
    
          <v-divider></v-divider>
    
          <v-list
            nav
            dense
          >
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-folder</v-icon>
              </v-list-item-icon>
              <v-list-item-title>My Files</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Shared with me</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-star</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Starred</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </div>   
</template>


<script>
    import { mapActions, mapGetters, mapState } from 'vuex'

    export default {
        data: ()=>({
            name: 'navBar',

            components:{

            },
            dialog1 : false,
            dialog2 : false,
            navDraw: false,
            items: [
                    { title: 'Dashboard', icon: 'mdi-view-dashboard' },
                    { title: 'Photos', icon: 'mdi-image' },
                    { title: 'About', icon: 'mdi-help-box' },
                    ],
        }),
        methods:{
    ...mapActions(['cerrarSesion']),


  },
  computed:{
    ...mapGetters(['existeUsuario']),
    ...mapState(['usuario']),
  }
    }
</script>