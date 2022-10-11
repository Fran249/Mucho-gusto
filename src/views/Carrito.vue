<template>
    <div>
        <navBar/>
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
                </v-list-item>
                <v-divider></v-divider>
            </v-list>
            <div class="div-comprar-total">
                <h3>
                    Total: $ {{this.precioTotal}}
                </h3>
                <v-btn @click="borrarCard(carrito)" width="50%">
                    Comprar
                </v-btn>
            </div>
    </div>
</template>

<script>
    import navBar from "@/components/navBar.vue";
    import { getFirestore, doc, updateDoc, arrayRemove,arrayUnion, onSnapshot} from "firebase/firestore";
    import { initializeApp } from 'firebase/app';
    import { auth, firebaseConfig} from '../firebase/index'

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    export default {


        name : 'carritoComponent',
        components: {
            navBar,
        },
        data: ()=>({
            carrito: [],
            precioTotal: [],
        }),
        mounted(){
            onSnapshot(doc(db, `Usuarios/${auth.currentUser.uid}`), (doc) => {
                
                

                this.carrito = doc.data().compras;
                console.log(this.carrito)


                this.carrito.forEach(element => {
                    const subTotal = Number(element.value) * Number(element.precio)
                    
                    this.precioTotal.push(subTotal)
                })

                this.precioTotal = this.precioTotal.reduce((a,b) => a + b , 0 );
                
                
            });
         
        },

        methods:{
            borrarCard(carrito){
                carrito.forEach(element => {

                    const cardRef = doc(db, "AdminStock/v-card1");
                    
                        updateDoc(cardRef, {
                    cards: arrayRemove({ title: element.title, src: element.src, id: element.id, cantidad: element.cantidad, precio: element.precio , value: ''})
                    });
                    updateDoc(cardRef, {
                    cards: arrayUnion({ title: element.title, src: element.src, id: element.id, cantidad: `${element.cantidad - element.value} ` ,precio: element.precio, value: ''})
                    });
                
                    const compraRef = doc(db, `Usuarios/${auth.currentUser.uid}`);
                    updateDoc(compraRef, {
                    compras: arrayRemove({ title: element.title, src: element.src, id: element.id, cantidad: element.cantidad, precio: element.precio , value: element.value})
                    });
               
                    this.precioTotal = []
                    setTimeout(this.actualizarPagina, 2000)
                    }
                )
            },
            actualizarPagina(){
                location.reload()
            },
            borrarArticuloCarrito(carr){
                
                const compraRef = doc(db, `Usuarios/${auth.currentUser.uid}`);
                updateDoc(compraRef, {
                compras: arrayRemove({ title: carr.title, src: carr.src, id: carr.id , cantidad: carr.cantidad, precio: carr.precio, value:carr.value})
                });
            }
        }

    }


</script>