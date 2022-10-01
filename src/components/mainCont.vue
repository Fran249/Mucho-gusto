<template>
    <!--<div>
        <h3>CONTENIDO MAIN</h3>
        <div>
      <h1 v-if="usuario.rol == 'admin' ">Admin</h1>
      <h2 v-if="usuario.rol == 'user' ">User</h2>
      <p>{{usuario}}</p>     
  </div>
    </div>-->
    <v-container>
        <v-fab-transition>
              <v-btn
                v-show="dialogUser"
                fixed
                right
                fab
                text
                height="1px"
                width="1px"
                class="alerta"
              >
              <v-alert
                shaped
                type="warning"
                >
                Por favor, Inicia Sesion
                </v-alert>
              </v-btn>
        </v-fab-transition>

        <v-menu transition="slide-x-transition" v-if="existeUsuario">
            <template v-slot:activator="{ on, attrs }">
                <v-fab-transition>
                <v-btn
                v-show="carritoCompra"
                fixed
                right
                fab
                v-bind="attrs"
                v-on="on"
                icon
              >
              <v-icon color="#FFD700">
                mdi-shopping
              </v-icon>
                </v-btn>
                </v-fab-transition>
            </template>
            <v-list width="250px"  v-for="carr in carrito" :key="carr.nombre">
                <v-list-item>
                    {{carr.nombre}}
                </v-list-item>
            </v-list>
        </v-menu>
        <v-row >
            <v-col 
            v-for="card in cards" :key="card.title"
            cols="3" >
                <v-card width="250px" height="500px">
                    <v-img :src="card.src" width="250px" height="250px">

                    </v-img>
                    <v-card-title>
                        <h3>
                           {{card.title}}
                        </h3>
                    </v-card-title>
                    
                    <v-card-text>
                        <p class="cardText">
                          Descripcion del producto
                          Descripcion del producto
                          Descripcion del producto
                          Descripcion del producto
                          Descripcion del producto
                        </p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text @click="detectUserAndBuy(card)">
                            <h3 class="v-btn-comprar">
                                Agregar al carrito
                            </h3>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
    import { mapState, mapGetters } from 'vuex'
    import { getFirestore, doc, onSnapshot  } from "firebase/firestore";
    import { initializeApp } from 'firebase/app';
    import { auth, firebaseConfig} from '../firebase/index'
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    export default {
        name: 'mainCont',
        data: ()=>({

            cards: null,
            dialogUser: false,
            carrito: [],
            carritoCompra: true,
        }),
        mounted(){
            onSnapshot(doc(db, "AdminStock/v-card1"), (doc) => {
                
                this.cards = doc.data().cards;


            });

        },
        methods:{
            detectUserAndBuy(card){
                if( auth.currentUser == null){
                    this.dialogUser = true;
                    setTimeout(this.quitarAlerta, 1500);
                }else{
                    console.log(card)
                    const cardItems = {
                       'nombre': card.title,
                       'imagen' : card.src,
                       'id' : card.id
                    }
                    this.carrito.push(cardItems)
                    
                }
            },
            quitarAlerta(){
                this.dialogUser = false
            }

        },
         computed:{
      ...mapState(['usuario']),
      ...mapGetters(['existeUsuario']),
  },
    }
</script>

<style lang="scss" scoped>

.cardText{
    text-align: match-parent;
}
.v-btn-comprar{
    color: rgba(94, 12, 148, 0.699)
}
.alerta{
        margin-right: 150px;
    }

#lista-compras{
    display: none;
    width: 300px;
    z-index: 9999;
    position: fixed;
    margin-left: 71%;
    height: 500px;
}
#lista-comprasOn{
    display: block;
}
</style>