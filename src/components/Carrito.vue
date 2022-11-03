<template>
    <div>
        <v-row>
                <v-col cols="12">
                    
                    <div class="close">
                    <h3 class="mt-3 mb-3 ml-5">Carrito</h3>
                    <v-btn text icon class="mt-3" @click="cerrarCarrito()">
                        <v-icon >
                        mdi-close
                        </v-icon>
                    </v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-divider class="mb-5"> </v-divider>
            <v-list width="250px"  v-for="carr in carrito" :key="carr.title"   class="list" >
                <v-list-item class="d-flex justify-space-between">
                <v-img :src="carr.src" width="100" height="100" ></v-img>
                <div class="d-flex flex-column justify-center">
                  <h3 class="ml-2">{{carr.title}}</h3>
                  <p class="ml-2">{{carr.descripcion}}</p>
                    <div class="d-flex flex-row justify-center ml-3 mt-10">
                        
                        <v-btn tile icon @click="disminuir(carr)"  outlined color="#02265c" width="30" height="30">
                            <v-icon size="15px">
                                mdi-minus
                            </v-icon>
                        </v-btn>
                        <div
                        class="text-center pa-1 card-value"
                        >
                        <p class="number-value">{{Number(carr.value)}}</p>
                        </div>
                        <v-btn tile icon @click="aumentar(carr)"  outlined color="#02265c" width="30" height="30">
                            <v-icon size="15px">
                                mdi-plus
                            </v-icon>
                        </v-btn>
                        <p class="precio-value ml-5">${{carr.precio}}</p>
                        </div>
                </div>
                <div class="d-flex flex-column align-self-start ml-2">
                    <v-btn icon @click="borrarArticuloCarrito(carr)">
                        <v-icon color="#b3b6bc">
                            mdi-close
                        </v-icon>
                    </v-btn>
                    
                </div>
                </v-list-item>
                <v-divider class="mt-10"></v-divider>
            </v-list>
            <div v-if="precioTotalArray == 0">
                <h3 class="h3-carrito text-center mt-10">
                    Parece que no tienes articulos en tu carrito!
                </h3>
            </div>      
            <div v-else class="div-comprar-total">
                <h3 >
                    Total: ${{precioTotalArray}} 
                </h3>
                <router-link style="text-decoration: none;" :to="{ path: `/user/${this.usuario}/compra`, params: {username: this.usuario}}">
                <v-btn 
                    width="90%" 
                    class="mb-10 pa-5"
                    color="#febf2c">
                    <p class="mt-4 p-v-btn ">
                      INICIAR MI COMPRA
                    </p>
                </v-btn>
            </router-link>
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
        usuario: null,
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
            cerrarCarrito(){
                store.commit('toggleCarrito', false)
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

        },
            beforeCreate(){

        onAuthStateChanged(auth, (user) => {
                this.usuario = auth.currentUser.uid
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
                        subTotales.push((Number(element.value) * Number(element.precio)))
                        
                    })
            var sumaTotal = subTotales.reduce((prev, curr) => prev + curr, 0)
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

.p-v-btn{
    font-family: 'humanst521_btbold';
    color: #fff
}
.h3-carrito{
    font-family: humanst521-2;
    font-weight: bolder;
    font-size: 20px;
    color: #02265C;
}
.v-btn {
  text-transform:none !important;
}
p{
  font-family: humanst521-1;
  font-size: 15px;
}

.div-comprar-total{
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}
.card-value{
    width: 30px;
    height: 30px;
    border: 0.2px solid #02265C;
    .number-value{
        color: #02265C;
        font-family: humanst521-2;
    }
}
.precio-value{
    color: #02265C;
    font-family: humanst521-2;
    font-size: 19px;
}
h3{
    font-family: humanst521-2;
    font-weight: bolder;
    font-size: 20px;
}
.close{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media only screen and (max-width: 960px){

    .list{
        transform: scale(0.7);
    }
}

</style>