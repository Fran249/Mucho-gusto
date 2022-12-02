<template >
    <div id="template">
        <v-container v-if="width >= 960">
            <div class="mb-10">
            <h3 class="mi-compra mb-2">MI COMPRA</h3>
            <div class="bar-container">
            </div>
            </div>

            <v-row>
                <v-col cols="7">
                    <div class="d-flex flex-row">
                    <router-link to="/" style="text-decoration: none;" class="mb-5">
                        <v-btn text>
                            <v-icon color="#374763" size="25" class="mb-1">
                                arrow_back_ios
                            </v-icon>
                            <h3 class="h3-btn">SEGUIR COMPRANDO</h3>
                        </v-btn>
                    </router-link>
                </div>
                <v-list width="100%" v-for="carr in carrito" :key="carr.title" >
                <v-list-item>
                <div class="img-container">
                    <v-img :src="carr.src" width="100%" height="100" ></v-img>
                </div>
                <div class="d-flex flex-column justify-center">
                  <h3 class="h3-prod ml-2">{{carr.title}}</h3>

                    <div class="d-flex flex-row">
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
                        </div>
                            
                        </div>
                </div>
                <div class=" d-flex flex-column align-self-start delete-art ">
                    <v-btn icon @click="borrarArticuloCarrito(carr)" class="ml-10">
                        <v-icon color="#b3b6bc">
                            mdi-close
                        </v-icon>
                    </v-btn>
                    <p class="precio-value ml-5 mt-10" v-if="carr.value == 1">${{carr.precio}}</p>
                    <p class="precio-value ml-5 mt-10" v-else>${{Number(carr.precio) * Number(carr.value)}}</p>
                </div>
                
                </v-list-item>
                <v-divider></v-divider>
            </v-list>
            <v-divider class="mt-5"></v-divider>
                </v-col>
                <v-col cols="5">
                    <v-row>
                        <v-col cols="12">
                            <h3 class="h3-resumen mt-5 mb-5">RESUMEN DE CUENTA</h3>
                            <h3 class="mt-5 mb-5">{{this.carrito.length}} Artículos</h3>
                            <div class="d-flex flex-row mt-5 mb-5">
                                <v-icon color="#374763" class="mr-2">
                                    mdi-ticket-confirmation
                                </v-icon>
                                <h3 class="h3-promo">¿Tienes un código de promoción?</h3>
                            </div>
                            <div>
                                <v-text-field color="grey" label="Codigo" append-icon="mdi-ticket-confirmation" filled>

                                </v-text-field>
                            </div>
                        </v-col>
                    </v-row>
                    <v-divider class="mb-5"></v-divider>
                    <v-row>
                        <v-col cols="6">
                            <div>
                            <h3 class="h3-sub-desc-total">SUBTOTAL:</h3>
                            </div>
                            <div>
                            <h3 class="mt-15 h3-sub-desc-total">DESCUENTO:</h3>
                            </div>
                        </v-col>
                        <v-col cols="6">
                            <div>
                            <h3 class="ml-15 h3-sub-desc-total"> ${{ precioTotalArray}} </h3>
                            </div>
                            <div>
                            <h3 class="ml-15 mt-15 h3-sub-desc-total"> ${{descuento}} </h3>
                            </div>
                        </v-col>
                    </v-row>
                    <v-divider class="mb-5 mt-5"></v-divider>
                    <v-row>
                        <v-col cols="6">
                            <h3 class="h3-resumen"  >
                            TOTAL:
                            </h3>
                        </v-col>
                        <v-col cols="6">
                            <h3 class="ml-15 h3-resumen">
                            ${{Number(precioTotalArray)- Number(descuento)}} 
                            </h3>
                        </v-col>
                        <v-btn 
                    @click="comprarPrimerPaso(carrito)"
                    width="90%" 
                    class="mb-10 pa-5"
                    color="#febf2c">
                    <p class="mt-4 p-v-btn ">
                      INICIAR MI COMPRA
                    </p>
                    </v-btn>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else class="container-mobile">
            <div class="mb-10">
            <h3 class="mi-compra mb-2">MI COMPRA</h3>
            <div class="bar-container">
            </div>
            </div>

            <v-row>
                <v-col cols="12">
                    <div class="d-flex flex-row">
                    <router-link to="/" style="text-decoration: none;" class="mb-5">
                        <v-btn text>
                            <v-icon color="#374763" size="25" class="mb-1">
                                arrow_back_ios
                            </v-icon>
                            <h3 class="h3-btn">SEGUIR COMPRANDO</h3>
                        </v-btn>
                    </router-link>
                </div>
                <v-list width="100%" v-for="carr in carrito" :key="carr.title" >
                <v-list-item>
                <div class="img-container">
                    <v-img :src="carr.src" width="100%" height="100" ></v-img>
                </div>
                <div class="d-flex flex-column justify-center">
                  <h3 class="h3-prod ml-2">{{carr.title}}</h3>

                    <div class="d-flex flex-row">
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
                        </div>
                        <div class=" d-flex flex-column align-self-start delete-art ">
                    <v-btn icon @click="borrarArticuloCarrito(carr)" class="ml-10">
                        <v-icon color="#b3b6bc">
                            mdi-close
                        </v-icon>
                    </v-btn>
                    <p class="precio-value ml-5 mt-10" v-if="carr.value == 1">${{carr.precio}}</p>
                    <p class="precio-value ml-5 mt-10" v-else>${{Number(carr.precio) * Number(carr.value)}}</p>
                </div>
                
                        </div>
                </div>
     
                </v-list-item>
                <v-divider></v-divider>
            </v-list>
            <v-divider class="mt-5"></v-divider>
                </v-col>
                <v-col cols="12">
                    <v-row>
                        <v-col cols="12">
                            <h3 class="h3-resumen mt-5 mb-5">RESUMEN DE CUENTA</h3>
                            <h3 class="mt-5 mb-5">{{this.carrito.length}} Artículos</h3>
                            <div class="d-flex flex-row mt-5 mb-5">
                                <v-icon color="#374763" class="mr-2">
                                    mdi-ticket-confirmation
                                </v-icon>
                                <h3 class="h3-promo">¿Tienes un código de promoción?</h3>
                            </div>
                            <div>
                                <v-text-field color="grey" label="Codigo" append-icon="mdi-ticket-confirmation" filled>

                                </v-text-field>
                            </div>
                        </v-col>
                    </v-row>
                    <v-divider class="mb-5"></v-divider>
                    <v-row>
                        <v-col cols="6">
                            <div>
                            <h3 class="h3-sub-desc-total">SUBTOTAL:</h3>
                            </div>
                            <div>
                            <h3 class="mt-15 h3-sub-desc-total">DESCUENTO:</h3>
                            </div>
                        </v-col>
                        <v-col cols="6">
                            <div>
                            <h3 class="ml-15 h3-sub-desc-total"> ${{ precioTotalArray}} </h3>
                            </div>
                            <div>
                            <h3 class="ml-15 mt-15 h3-sub-desc-total"> ${{descuento}} </h3>
                            </div>
                        </v-col>
                    </v-row>
                    <v-divider class="mb-5 mt-5"></v-divider>
                    <v-row>
                        <v-col cols="6">
                            <h3 class="h3-resumen"  >
                            TOTAL:
                            </h3>
                        </v-col>
                        <v-col cols="6">
                            <h3 class="ml-15 h3-resumen">
                            ${{Number(precioTotalArray)- Number(descuento)}} 
                            </h3>
                        </v-col>
                        <v-btn 
                    @click="comprarPrimerPaso()"
                    width="90%" 
                    class="mb-10 pa-5"
                    color="#febf2c">
                    <p class="mt-4 p-v-btn ">
                      INICIAR MI COMPRA
                    </p>
                    </v-btn>
                    <div id="button-checkout"></div>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { getFirestore, onSnapshot, doc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { firebaseConfig} from '../firebase/index'
import store from '@/store';
import router from '@/router';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



// eslint-disable-next-line no-undef, no-unused-vars
const mercadopago = new MercadoPago('APP_USR-5b1c8b38-3817-4122-8a38-b3aa9c101518', {
  locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
});


const auth = getAuth();
    export default {
        
        name: 'confirmBuy',

        data: ()=>({
            precioTotalArray: [],
            carrito: store.state.carritoCompras,
            descuento: 0,
            totalCard: [],
            width: window.innerWidth,
            name : "",
            email : "",
            numberPhone : "",
            numberDNI : "",
            streetName : "",
        }),
        
        methods: {

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

            comprarPrimerPaso(){

                const items = [];
                onSnapshot(doc(db, `/Usuarios/${auth.currentUser.uid}/`), (doc) => {
                
                        this.name =  doc.data().nombreCompleto
                        this.email = auth.currentUser.email
                        this.numberPhone = doc.data().telefonoContacto    
                        this.numberDNI = doc.data().dni
                        this.streetName = doc.data().direccion
            });
                let dataStorage = JSON.parse(localStorage.getItem(`cart/${auth.currentUser.uid}`));
                console.log(dataStorage)
                dataStorage.forEach(element =>{
                    const articulos = {
                        picture_url : element.src,
                        quantity : element.value,
                        description : element.descripcion,
                        unit_price: element.precio,
                        title: element.title,
                    }
                    items.push(articulos)
                })
              
                const orderData = {
                    items : items,
                    
                    metadata: { userUID : auth.currentUser.uid,
                            nombre: this.name,
                            numberPhone : this.numberPhone,
                            numberDNI : this.numberDNI,
                            direccion : this.streetName,
                            email : this.email,

                        },
                    
                }
                console.log(items)
                console.log(orderData)
                // eslint-disable-next-line no-unused-vars
                    const AccessToken = process.env.VUE_APP_ACCESS_TOKEN
                    fetch("https://us-central1-prueba-auth-vuex-router.cloudfunctions.net/mpActions", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderData),
                })
                    .then(function (response) {
                    return response.json();
                    })
                    .then(function (preference) {
                       const mp =  mercadopago.checkout({
                    preference: {
                    id: preference.id,
                    },
                });
                mp.open()
                })
                localStorage.clear()
                //Clear al Local Storage, para cerrar la compra y proceder al pago



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
        mounted(){
            onSnapshot(doc(db, `/Usuarios/${auth.currentUser.uid}/`), (doc) => {
                
                this.name =  doc.data().nombreCompleto
                this.email = auth.currentUser.email
                this.numberPhone = doc.data().telefonoContacto    
                this.numberDNI = doc.data().dni
                this.streetName = doc.data().direccion
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
            if(this.carrito.length <= 0 ){
                router.push('/')
            }else{
                return
            }
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
    src: url('/src/assets/Humanst521 BT Bold.ttf');
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
    @font-face {
    font-family: 'humanst521_btbold';
    src: url('/src/assets/humanst521_bt_bold-webfont.woff2') format('woff2'),
         url('/src/assets/humanst521_bt_bold-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;

}
.p-v-btn{
    font-family: 'humanst521_btbold';
    color: #fff
}

.delete-art{
    margin-left: 40%;
}
.img-container{
    width: 25%;
}
.h3-resumen{
    font-family: 'humanst521_btbold';
    ;
    font-size: 19px;
    color: #374763;
}
.v-btn {
  text-transform:none !important;

}
p{
  font-family: humanst521-1;
  font-size: 15px;
}

.h3-sub-desc-total{
    font-family: humanst521-1;
  font-size: 15px;
}
h3{
    font-family: humanst521-1;
    color: #727272; 
}
.h3-promo{
    font-family: 'humanst521_btroman';
    font-size: 15;
    color: #374763;
}
.h3-prod{
    font-family: 'humanst521_btbold';
    font-size: 15;
    color: black 
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
    margin-left: 50%;
    
}
h3{
    font-family: humanst521-2;
    font-weight: bolder;
    font-size: 20px;
}
.bar-container{
  width: 100%;
  height: 0.2rem;
  display: flex;
  flex-direction: row;
  background: rgb(242,192,74);
  background: linear-gradient(90deg, rgba(242,192,74,1) 140px, rgba(179,182,188,1) 140px);
}

.mi-compra{
    font-family: 'humanst521_btbold';
    color: black;
    font-size: 20px;
}
.h3-btn{
    font-family: 'humanst521_btbold';
    color: #374763;
    font-size: 18px;
    letter-spacing: 0ch;
}

@media only screen and (max-width: 960px){
    .container-mobile{
        transform: scale(0.85);
    }
}
</style>