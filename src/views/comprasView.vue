<template>
    
    <div>
        <navBarAdmin />
    <v-row>
            <v-col cols="12" md="6" v-for="comprados in comprasHechas" :key="comprados">
                <div class="d-flex flex-row ma-5">
                        <v-card>    
                        <div>
                            <v-tooltip right>
                            <template v-slot:activator="{ on, attrs }">
                            <v-card-title class="ma-10" v-bind="attrs" v-on="on" ><h3>{{comprados.nombre}}</h3></v-card-title>
                            </template>
                            <span>Nombre</span>
                            </v-tooltip>
                            <v-divider class="ma-3"></v-divider>
                            <v-card-text class="mb-1"><h3>Email:</h3>{{comprados.email}}</v-card-text>
                            <v-divider class="ma-3"></v-divider>
                            <v-card-text class="mb-1"><h3>Telefono:</h3>{{comprados.number_phone}}</v-card-text>
                            <v-divider class="ma-3"></v-divider>
                            <v-card-text class="mb-1"><h3>Direccion:</h3>{{comprados.direccion}}</v-card-text>
                            <v-divider class="ma-3"></v-divider>
                            <v-card-text class="mb-1"><h3>Estado de compra:</h3>{{comprados.estado}}</v-card-text>
                            <v-divider class="ma-3"></v-divider>
                            <v-card-text class="mb-1"><h3>Fecha:</h3>{{comprados.fecha}}</v-card-text>
                            <v-divider class="ma-3"></v-divider>
                            <v-card-text class="mb-1"><h3>TOTAL:</h3>{{comprados.total}}</v-card-text>
                        </div>
                    
                    </v-card>
                    <v-card v-for="comp in comprados.items" :key="comp.title">
                        <div >
                            <div >
                                <h3 class="ma-15">ARTÍCULO</h3>
                            </div>
                            <v-divider class="mt-5 ml-5 mr-5"></v-divider>
                            <v-card-text>
                            <h3  class="mb-4">Titulo:</h3> {{comp.title}}
                            </v-card-text>
                            <v-divider class="ma-3"></v-divider>
                            <v-card-text>
                            <h3  class="mb-5">Precio /U:</h3>{{comp.unit_price}}
                            </v-card-text>
                            <v-divider class="ma-3"></v-divider>
                            <v-card-text>
                            <h3  class="mb-5">Cantidad:</h3>{{comp.quantity}}
                            <v-divider class="ma-3"></v-divider>
                            <div class="mt-10">
                                <v-img width="150" :src="comp.picture_url"></v-img>
                            </div>
                            </v-card-text>
                    </div>
                    </v-card> 

                </div>
            </v-col>
    </v-row>
    </div>
</template>


<script>
    import navBarAdmin from "@/components/navBarAdmin.vue";
    import { getFirestore, collection, query, getDocs } from "firebase/firestore";
    import { initializeApp } from 'firebase/app';
    import {  firebaseConfig} from '../firebase/index'
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
export default {
    name : 'comprasView',
    components:{
        navBarAdmin,
    },
    data: ()=>({
        comprasHechas: [],
    }),

    methods: { 
        despacharCompra(comprados){
            console.log(comprados)
        },
    },
    beforeCreate(){
        const q = query(collection(db, "Compras"));
                
                getDocs(q).then(resolve =>{
                    resolve.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                    this.comprasHechas.push(doc.data())
                      
                
                });
                })
                
    },
    mounted(){
        console.log(this.comprasHechas)
    },
}


</script>


<style lang="scss" scoped>
    h3 {
        font-family: 'humanst521_btbold';
    color: black;

    }
</style>