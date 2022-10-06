<template>
    <div>    
    <!--<div>
        <h3>CONTENIDO MAIN</h3>
        <div>
      <h1 v-if="usuario.rol == 'admin' ">Admin</h1>
      <h2 v-if="usuario.rol == 'user' ">User</h2>
      <p>{{usuario}}</p>     
  </div>
    </div>-->
    <v-navigation-drawer 
        fixed
        permanent
        right v-if="existeUsuario && carritoCompra">
            <v-row>
                <v-col cols="12">
                    <h3 class="mt-3 mb-3 ml-5">Mi carrito</h3>
                </v-col>
            </v-row>
            <v-divider> </v-divider>
            <v-list width="250px"  v-for="carr in carrito" :key="carr.nombre">
                <v-list-item>
                  <v-avatar class="ml-2" >
                    <v-img :src="carr.imagen"></v-img>
                  </v-avatar> 
                  <h3 class="ml-2">X{{carr.cantidadComprar}}</h3>
                  <h3 class="ml-2">{{carr.nombre}}</h3>
                  <v-btn icon @click="borrarArticuloCarrito(carr)">
                    <v-icon color="red">
                        mdi-delete
                    </v-icon>
                    </v-btn>
                </v-list-item>
                <v-divider></v-divider>
            </v-list>
            <h3 class="ml-5">
            Total: ${{precioTotal}} 
            </h3>
            <v-btn @click="borrarCard(carrito)">Comprar</v-btn>
        </v-navigation-drawer>
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


        <v-row >
            <v-col 
            v-for="card in cards" :key="card.title"
            cols="4" >
                <v-card width="260px" height="650px">
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
                        <p v-if="card.cantidad >= 1">
                            {{card.cantidad}} Unidades disponibles
                        </p>
                        <p v-if="card.cantidad >= 1">${{card.precio}}</p>
                        <v-text-field 
                        v-if="card.cantidad >= 1"
                        v-model = cantidadCustom
                        label="Cantidad deseada"
                        id="textfield"
                        >
                        </v-text-field>
                        <p v-else>Sin stock</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn v-if="card.cantidad >= 1" text @click="detectUserAndBuy(card)">
                            <h3 class="v-btn-comprar">
                                Agregar al carrito
                            </h3>
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
    import { getFirestore, doc, onSnapshot, updateDoc,arrayRemove, arrayUnion } from "firebase/firestore";
    import { initializeApp } from 'firebase/app';
    import { auth, firebaseConfig} from '../firebase/index'
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    export default {
        name: 'mainCont',
        data: ()=>({
            estaComprando: false,
            cards: null,
            dialogUser: false,
            carrito: [],
            carritoCompra: false,
            cantidadComprar1: '',
            cantidadCustom: '',
            precioTotal:'',
            precioTotalArray: []
        }),
        mounted(){
            onSnapshot(doc(db, "AdminStock/v-card1"), (doc) => {
                
                this.cards = doc.data().cards;
                


            });

        },
        methods:{
            detectUserAndBuy(card){
                const index = this.carrito.findIndex(object => {
                    return object.id === card.id;
                    });


                console.log(index)
                if( auth.currentUser == null){
                    this.dialogUser = true;
                    setTimeout(this.quitarAlerta, 1500);
                }else if( index == -1){
                    this.carritoCompra = true
                    const cardItems ={
                        nombre: card.title,
                        imagen : card.src,
                        id: card.id,
                        cantidadComprar: this.cantidadCustom,
                        cantidad: card.cantidad,
                        precio: card.precio
                    }
                    
                    
                    
                    this.carrito.push(cardItems)
                    this.precioTotalArray.push(Number(cardItems.precio * this.cantidadCustom))
                    console.log(this.carrito)
                    console.log(this.precioTotalArray)

                }else if ( index >= 0){

                    const cardItems = {
                        nombre: card.title,
                        imagen : card.src,
                        id: card.id,
                        cantidadComprar: this.cantidadCustom,
                        cantidad: card.cantidad,
                        precio: card.precio
                    }
                    var cantidad =  this.carrito[index].cantidadComprar = Number(this.carrito[index].cantidadComprar) + Number(this.cantidadCustom)
                    this.cantidadComprar1 = cantidad
                    this.precioTotalArray.push(Number(cardItems.precio * this.cantidadCustom))
                   console.log(this.cantidadComprar1)
                   console.log(this.carrito)
                   console.log(this.precioTotalArray)
                }
            },
            borrarCard(carrito){
                carrito.forEach(element => {

                    const cardRef = doc(db, "AdminStock/v-card1");
                    if(element.cantidad >= 1){
                        updateDoc(cardRef, {
                    cards: arrayRemove({ title: element.nombre, src: element.imagen, id: element.id, cantidad: element.cantidad, precio: element.precio })
                    });
                    updateDoc(cardRef, {
                    cards: arrayUnion({ title: element.nombre, src: element.imagen, id: element.id, cantidad: `${element.cantidad - element.cantidadComprar}`,precio: element.precio })
                    });
                    



                    } else if(element.cantidad < 1) {
                        updateDoc(cardRef, {
                    cards: arrayRemove({ title: element.nombre, src: element.imagen, id: element.id, cantidad: element.cantidad, precio:element.precio })
                    });

                    }

                    const compraRef = doc(db, `Usuarios/${auth.currentUser.uid}`);

                    updateDoc(compraRef, {
                    compras: arrayUnion({ title: element.nombre, src: element.imagen, id: element.id, cantidad: element.cantidadComprar,precio: element.precio })
                    });

                    this.carrito = []
                    this.carritoCompra = false
                    setTimeout(this.actualizarPagina, 1200)
                    });
                
            },
            borrarArticuloCarrito(carr){
                const index = this.carrito.findIndex(object => {
                    return object.id === carr.id;
                    });
                
                this.carrito.splice(index,1)
                this.precioTotal = this.precioTotal - carr.precio * carr.cantidadComprar
                if(this.precioTotal == 0 ){
                    this.precioTotalArray = []
                    this.carritoCompra = false
                }
            },
            actualizarPagina(){
                location.reload()
            },
            

            quitarAlerta(){
                this.dialogUser = false
            },
            

        },
        watch:{
        precioTotalArray(){
            
            

            let array = this.precioTotalArray;

            const reducer = (accumulator, curr) => accumulator + curr;
            let arraySumado = array.reduce(reducer);
            this.precioTotal = arraySumado
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