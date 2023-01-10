<template>
    <div class="container-main">
    <v-container v-if="width > 960">
        <v-row  >
            <v-col 
            v-for="card in cardsfiltradas" :key="card.title"
            cols="6" lg="3" md="4" sm="4" xl="2" >
                <v-card style="border-radius: 10px;"  elevation="9" class="v-card">
                    <div >
                        <v-img style="border-radius: 10px;
                        border-bottom-right-radius: 1px;
                        border-bottom-left-radius: 1px;"
                        :src="card.src" width="100%" :height ="heightImg()" class="v-img-card">

                        </v-img>
                    </div>
                    <v-card-title class="v-card-title">
                        <h3>
                           {{card.title}}
                        </h3>
                    </v-card-title>
                    <v-card-text class="v-card-text">
                        {{card.descripcion}}
                        <p v-if="card.cantidad >= 1">
                            STOCK DISPONIBLE
                        </p>
                        <p v-if="card.cantidad >= 1">${{card.precio}}</p>
                        <p v-else>SIN STOCK</p>
                    </v-card-text>
                    <v-card-actions v-if="card.cantidad >= 1" class="actions-card">
                        <div class="div-btn">
                        <v-btn style="border-radius: 10px;
                                border-top-right-radius: 1px;
                                border-bottom-right-radius: 1px;" 
                                icon @click="aumentarCantidad(card)" outlined color="#02265c" width="30" height="30" class="v-btn-sumrest">
                            <v-icon>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                        <div
                        class="text-center pa-1 card-value"
                        >
                        <p class="number-value">{{Number(card.value)}}</p>
                        </div>
                        <v-btn style="border-radius: 1px;
                            border-top-right-radius: 10px;
                            border-bottom-right-radius: 10px;"
                            icon @click="disminuirCantidad(card)" outlined color="#02265c" width="30" height="30" class="v-btn-sumrest">
                            <v-icon>
                                mdi-minus
                            </v-icon>
                        </v-btn>
                    </div>
                        <v-btn v-if="card.cantidad >= 1" @click="detectUserAndBuy(card)" icon color="white" width="120" tile style="background-color: #02265C; border-radius: 10px">
                            <p class="mt-4 ml-4 agre">AGREGAR</p>
                            <v-icon size="15px" class="ml-2 mr-2">
                                mdi-briefcase
                            </v-icon>
                                
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <v-container v-if="width < 960" fluid>
        <v-row >
            <v-col 
            v-for="card in cardsfiltradas" :key="card.title"
            cols="6" lg="3" md="4" sm="4" xl="2" >
            <v-card  style="border-radius: 10px;" elevation="9" height="250px" width="100%">
                    <div >
                        <v-img style="border-radius: 10px;
                        border-bottom-right-radius: 1px;
                        border-bottom-left-radius: 1px;"
                        :src="card.src" width="100%" :height ="heightImg()" class="v-img-card">

                        </v-img>
                    </div>
                    <v-card-title class="v-card-title">
                        <h3>
                           {{card.title}}
                        </h3>
                    </v-card-title>
                    <v-card-text class="v-card-text">
                        {{card.descripcion}}
                        <p v-if="card.cantidad >= 1">
                            STOCK DISPONIBLE
                        </p>
                        <p v-if="card.cantidad >= 1">${{card.precio}}</p>
                        <p v-else>SIN STOCK</p>
                    </v-card-text>

                    <v-card-actions class="actions-card">
                        <div class="div-btn">
                            <v-btn style="border-radius: 5px;
                                border-top-right-radius: 1px;
                                border-bottom-right-radius: 1px;"  icon @click="aumentarCantidad(card)" outlined color="#02265c" width="20" height="20" class="v-btn-sumrest">
                                    <v-icon>
                                        mdi-plus
                                    </v-icon>
                                </v-btn>
                                    
                                <div
                                class="card-value"
                                >
                                <p class="number-value ">{{Number(card.value)}}</p>
                                </div>
                                <v-btn style="border-radius: 5px;
                                border-top-left-radius: 1px;
                                border-bottom-left-radius: 1px;"   icon @click="disminuirCantidad(card)" outlined color="#02265c" width="20" height="20" class="v-btn-sumrest">
                                    <v-icon>
                                        mdi-minus
                                    </v-icon>
                                </v-btn>
                                </div>
                                
                                    <v-btn v-if="card.cantidad >= 1" @click="detectUserAndBuy(card)" icon color="white" width="75px" height="20px" tile style="background-color: #02265C; margin-bottom: 6px;  border-radius: 5px">
                                    <p class="mt-4 ml-6 agre" style="font-size: 8px;">AGREGAR</p>
                                    <v-icon size="11px" class="ml-1 mr-4">
                                        mdi-briefcase
                                    </v-icon>
                                        
                                    </v-btn>
                        </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <!-----------------------------------------SnackBars----------------------------------------------------->
        <v-snackbar
        v-show="dialogUser"
        color="red"
        >
        <p class="p-inicie-sesion mt-4">
            Por favor, Inicia Sesion
        </p>
        </v-snackbar>
        <v-snackbar
        v-model="dialogCarrito"
        color="green">
            <div class="d-flex flex-row justify-space-between">
                <p class="p-agregado-carr mt-4 ml-15">
                    Agregado al carrito!
                </p>
                <v-icon color="white" size="25">
                    mdi-check
                </v-icon>
            </div>
        </v-snackbar>
  
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
            cardsfiltradas: [],
            dialogUser: false,
            dialogCarrito: false,
            carrito: [],
            cantidadComprar1: '',
            cantidadCustom: '',
            precioTotal:'',
            precioTotalArray: [],
            currentUser: '',
            width: window.innerWidth,
            reveal: false,
            cardId: null,
            popUp: false,
            
        }),
        beforeMount(){
            onSnapshot(doc(db, "AdminStock/Dulce"), (doc) => {
                
                this.cards = doc.data().cards
                this.cardsfiltradas = this.cards
                console.log(this.cardsfiltradas)
            });

            
        },
        mounted(){



        },
        methods:{


            transition(card){
                this.cardId = card.id

                if(card.id == this.cardId){
                    this.reveal = true
                }
            },
            heightImg(){
                if(window.innerWidth < 960){
                    return 100
                } else if (window.innerWidth > 960){
                    return 250
                }
            },
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
                    precio: parseFloat(card.precio),
                    cantidad: card.cantidad,
                    descripcion: card.descripcion,
                    value: card.value,
                    id: card.id,
                }
                this.carrito.push(cardItems)

                localStorage.setItem(`cart/${auth.currentUser.uid}`, JSON.stringify(this.carrito))

                store.commit('forceRenderCarrito', + 1)
                card.value = 1
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
         filterValue(){
            
            this.cardsfiltradas = this.cards.filter(item => item.title.toLowerCase().indexOf(this.filterValue ) !== -1)

         }
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
            filterValue:{
            get(){
                return store.state.filterValue
            },
            set(){
                
                
            }
        },
      
        },
    }
</script>

<style lang="scss" scoped>

.agre{ 
    color:#fff;
}
.v-btn {
    text-transform: none !important;
    color: white;
    
}



h3 {
    font-family: 'humanst521-2';
    font-size: 30px;
}
p{
  font-family: 'humanst521-1';
  font-size: 15px;
}
.p-agregado-carr{
font-family: 'humanst521-2';
  font-size: 20px;
  color: #fff;
}
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
        color: #02265C;
        font-family: 'humanst521-2';
        margin-bottom: 200px;

    }
}

.actions-card{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 50px;

}
.div-btn{
    display: flex;
}
.v-card--reveal {
  bottom: 0;
  position: absolute;
  width: 100%;
}

.actions-card-expanded {
    
    display: flex;
    flex-direction: row;
    margin-top: 60px;
    margin-right: 100%;
    gap: 13 px;
}
.container-main{
    margin-bottom: 25%;

    }

@media only screen and (max-width: 960px){
.container{padding: 0%;}
    .container-main{
         padding: 0px;
        margin-bottom: 30%;
    }
    .v-card {
        height: 250px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }
    .actions-card{
    display: flex;
    flex-direction: row;
    height: 25px;
    margin-top: 60px;
    
    gap: 8px;
}
.card-value{
    height: 20px;
    width: 20px;
    margin-bottom: 10%;
    .number-value{
        color: #02265C;
        font-family: 'humanst521-1';
        font-size: 13px;
        text-align: center;
       
    }
}
.v-card-title{
    transform: scale(0.8);
    height: 25px;
    margin-right: 25%;
    width: 100%;
}
.v-card-title h3{
    font-size: 15px;
}

.v-card-text{
    transform: scale(0.8);

    height: 25px;
}
.v-card-text p {
    font-size: 12px;
}

}


</style>