<template>
    <div>
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
        <v-fab-transition>
              <v-btn
                v-show="dialogCarrito"
                fixed
                right
                fab
                text
                height="1px"
                width="1px"
                class="alerta"
              >
              <v-alert
                dense
                text
                type="success"
                >
                Agregado al carrito!
                </v-alert>
              </v-btn>
        </v-fab-transition>
        <v-row >
            <v-col 
            v-for="card in cards" :key="card.title"
            cols="4" >
                <v-card tile>
                    <v-img :src="card.src" width="310px" height="150px">

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
                        <p v-if="card.cantidad >= 1">
                            {{card.cantidad}} Unidades disponibles
                        </p>
                        <p v-if="card.cantidad >= 1">${{card.precio}}</p>
                        <p v-else>Sin stock</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn tile icon @click="aumentarCantidad(card)" outlined color="#02265c" width="30" height="30">
                            <v-icon>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                        <div
                        class="text-center pa-1 card-value"
                        >
                        <p class="number-value">{{Number(card.value)}}</p>
                        </div>
                        <v-btn tile icon @click="disminuirCantidad(card)" outlined color="#02265c" width="30" height="30">
                            <v-icon>
                                mdi-minus
                            </v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn v-if="card.cantidad >= 1" @click="detectUserAndBuy(card)" icon color="white" width="110" tile style="background-color: #02265C">
                            Agregar
                            <v-icon size="15px">
                                mdi-briefcase
                            </v-icon>
                                
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'
    import { getFirestore, doc, onSnapshot } from "firebase/firestore";
    import { initializeApp } from 'firebase/app';
    import {  firebaseConfig} from '../firebase/index'
    import { getAuth, onAuthStateChanged} from "firebase/auth";
    import store from '@/store';
 

    const auth = getAuth();
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    export default {
        name: 'mainCont',
        data: ()=>({
            cards: null,
            cardsSalados: null,
            cardsPanificados: null,
            cardsDulces: null,
            dialogUser: false,
            dialogCarrito: false,
            carrito: [],
            cantidadComprar1: '',
            cantidadCustom: '',
            precioTotal:'',
            precioTotalArray: [],
            currentUser: '',
            
        }),
        beforeMount(){
           


        },
        mounted(){

            onSnapshot(doc(db, "AdminStock/Dulce"), (doc) => {
                
                this.cards = doc.data().cards
                
            });

        },
        methods:{
        //////////////// Funciones para el Carrito ///////////////////////////////////////////////////    
            aumentar(carr){
                const index = this.carrito.findIndex(object => {
                    return object.id === carr.id;
                    });
                let dataStorage = JSON.parse(localStorage.getItem(`cart/${auth.currentUser.uid}`));

                dataStorage[index].value = Number(dataStorage[index].value + 1)
                localStorage.setItem(`cart/${auth.currentUser.uid}`, JSON.stringify(dataStorage));
                this.carrito[index].value = Number(this.carrito[index].value) +1
                                
                var subTotales = []

                this.carrito.forEach(element => {
                        subTotales.push(Number(element.value) * Number(element.precio))
                        
                    })
                var sumaTotal = subTotales.reduce((prev, curr) => prev + curr, 0);
                this.precioTotalArray = sumaTotal

                
                
            },
            disminuir(carr){

                const index = this.carrito.findIndex(object => {
                    return object.id === carr.id;
                    });
                let dataStorage = JSON.parse(localStorage.getItem(`cart/${auth.currentUser.uid}`));

                if(dataStorage[index].value >= 2){

               

                dataStorage[index].value = Number(dataStorage[index].value - 1)
                localStorage.setItem(`cart/${auth.currentUser.uid}`, JSON.stringify(dataStorage));
                this.carrito[index].value = Number(this.carrito[index].value) - 1

                var subTotales = []

                this.carrito.forEach(element => {
                        subTotales.push(Number(element.value) * Number(element.precio))
                        
                    })
                var sumaTotal = subTotales.reduce((prev, curr) => prev + curr, 0);
                this.precioTotalArray = sumaTotal
                
                
                }
            },
            borrarArticuloCarrito(carr){

                const index = this.carrito.findIndex(object => {
                    return object.id === carr.id;
                    });
                
                var dataStorage = JSON.parse(localStorage.getItem(`cart/${auth.currentUser.uid}`));
                var dataItem = dataStorage[index]

                dataStorage.splice(dataStorage.indexOf(dataItem),1)

                localStorage.setItem(`cart/${auth.currentUser.uid}`, JSON.stringify(dataStorage));
                
                var indexof = this.carrito.indexOf(carr)
                this.carrito.splice(indexof, 1 )
                if(this.carrito.length == 0){
                    store.commit('toggleCarrito', false)
                }
                
                store.commit("sendNotif", this.carrito.length)
                            
            },

            quitarAlerta(){
                this.dialogUser = false
            },

          //////////////// Funciones para el Carrito /////////////////////////////////////////////////// 
          
          

        /////////////////// Funciones para el articulo///////////////////////////////////////////////
        aumentarCantidad(card){
                card.value = Number(card.value) +1
            },
            disminuirCantidad(card){
                if(card.value <= 1){
                    return
                } else{
                        card.value = Number(card.value) -1
                }
            },
            detectUserAndBuy(card){
                const index = this.carrito.findIndex(object => {
                    return object.id === card.id;
                    });
            if(auth.currentUser == null){

                this.dialogUser = true
                setTimeout(this.notificacionUserNoValid, 1200)

            }else{
               if (index == -1){
                const cardItems = {
                    title: card.title,
                    src: card.src,
                    precio: card.precio,
                    cantidad: card.cantidad,
                    value: 1,
                    id: card.id,
                }
                this.carrito.push(cardItems)

                localStorage.setItem(`cart/${auth.currentUser.uid}`, JSON.stringify(this.carrito))

                store.commit('forceRenderCarrito', + 1)
               }else{
                    return
                
               }
               this.dialogCarrito = true
               setTimeout(this.notificacionCarrito, 1200)

               store.commit("sendNotif", this.carrito.length)
            }
            },
            actualizarComponente(){
                this.carritoCompra = true
            },
            notificacionUserNoValid(){
                this.dialogUser = false
            },
            notificacionCarrito(){
                this.dialogCarrito = false
            }
        /////////////////// Funciones para el articulo/////////////////////////////////////////////// 


        },
        beforeCreate(){

            onAuthStateChanged(auth, (user) => {
                    if (user) {
                        let datosLocalStorage = JSON.parse(localStorage.getItem(`cart/${auth.currentUser.uid}`));
                        if(datosLocalStorage === null){
                            this.carrito = [];
                        }else{
                            this.carrito = datosLocalStorage;
                            store.commit("sendNotif", this.carrito.length)
                        } 
                    } else {
                        // User is signed out
                        // ...
                    }
                    });

                    


        },

        watch:{
            carrito(){
            var subTotales = []

             this.carrito.forEach(element => {
                        subTotales.push(Number(element.value) * Number(element.precio))
                        
                    })
            var sumaTotal = subTotales.reduce((prev, curr) => prev + curr, 0);
            this.precioTotalArray = sumaTotal

            store.commit('carritoCompras', this.carrito)
            console.log(store.state.carritoCompras)
         },
        },
         computed:{
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
        margin-top: 100px;
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
.card-value{
    width: 30px;
    height: 30px;
    border: 0.2px solid #02265C;
    .number-value{
        color: #02265C
    }
}


</style>