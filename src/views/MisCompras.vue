<template>
    <div>
    <nav-bar/>
    <v-container>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">
                       Imagen
                    </th>
                    <th class="text-left">
                       Nombre
                    </th>
                    <th class="text-left">
                        Precio
                    </th>
                    <th class="text-left">
                        Cantidad
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="prod in productos"
                    :key="prod.title"
                    
                    >
                    <td >
                        <v-avatar>
                            <v-img :src="prod.src">

                            </v-img>
                        </v-avatar>
                    </td>
                    <td >{{ prod.title }} </td>
                    <td>{{ prod.precio }} </td>
                    <td >{{ prod.cantidad }} </td>
                    <v-btn @click="borrarCard(prod)" text icon>
                        <v-icon color="red">
                            mdi-delete
                        </v-icon>
                    </v-btn>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </v-container>
    </div>
</template>

<script>
import navBar from '../components/navBar.vue'
import { getFirestore, doc, updateDoc, arrayRemove, onSnapshot} from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { auth, firebaseConfig} from '../firebase/index'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

    export default {

        name: 'MisCompras',
        components:{
            navBar
        },

        data: ()=>({
            productos: null,
        }),
        mounted(){
            onSnapshot(doc(db, `Usuarios/${auth.currentUser.uid}`), (doc) => {
                
                

                this.productos = doc.data().compras;


            });
        },
        methods:{
            borrarCard(prod){

                const compraRef = doc(db, `Usuarios/${auth.currentUser.uid}`);
                updateDoc(compraRef, {
                compras: arrayRemove({ title: prod.title, src: prod.src, id: prod.id , cantidad: prod.cantidad, precio: prod.precio, value:prod.value})
                });
                }

        }

        }
</script>