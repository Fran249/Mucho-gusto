<template>
    <div>
        <v-row>
                <v-col cols="12">
                    <h3 class="mt-3 mb-3 ml-5">Carrito</h3>
                </v-col>
            </v-row>
            <v-divider> </v-divider>
            <v-list width="250px"  v-for="carr in carrito" :key="carr.title" class="d-flex justify-center">
                <v-list-item>
                  <v-avatar class="ml-2" >
                    <v-img :src="carr.src"></v-img>
                  </v-avatar> 
                  <h3 class="ml-2">X{{carr.value}}</h3>
                  <h3 class="ml-2">{{carr.title}}</h3>
                  <v-btn icon @click="borrarArticuloCarrito(carr)">
                    <v-icon color="red">
                        mdi-delete
                    </v-icon>
                    </v-btn>
                    <div >
                        <v-btn text @click="aumentar(carr)">
                            <v-icon>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                        <v-btn text @click="disminuir(carr)">
                            <v-icon>
                                mdi-minus
                            </v-icon>
                        </v-btn>
                        </div>
                </v-list-item>
                <v-divider></v-divider>
            </v-list>
            <div class="div-comprar-total">
                <h3 >
                    Total: ${{precioTotalArray}} 
                </h3>
                <v-btn @click="comprarPrimerPaso(carrito)" width="50%">
                    Comprar
                </v-btn>
            </div>       
    </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'
import { getAuth, onAuthStateChanged} from "firebase/auth";
import store from '@/store';

const auth = getAuth();
 export default {
    name: 'CarritoCompras',

    data: ()=>({
        precioTotalArray: [],
        carrito: store.state.carritoCompras,
    }),
    updated(){
        this.carrito = store.state.carritoCompras
    },
    methods:{
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
            this.carrito = store.state.carritoCompras
            
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


.div-comprar-total{
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}


</style>