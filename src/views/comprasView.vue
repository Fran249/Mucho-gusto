<template>
    
    <div>
        <navBarAdmin />
    <v-row>
            <v-col cols="6" v-for="comprados in comprasHechas" :key="comprados">
                <div class="d-flex flex-row">
                    <v-card>    
                    <v-card-title>{{comprados.nombre}}</v-card-title>
                    <v-card-text><h3>Email</h3>{{comprados.email}}</v-card-text>
                    <v-card-text><h3>Telefono</h3>{{comprados.number_phone}}</v-card-text>
                    <v-card-text><h3>Direccion</h3>{{comprados.direccion}}</v-card-text>
                    <v-card-text><h3>Estado de compra</h3>{{comprados.estado}}</v-card-text>
                    <v-card-text><h3>Total</h3>{{comprados.total}}</v-card-text>
                    
            </v-card>
            <v-card v-for="comp in comprados.items" :key="comp">
                    <div class="mt-15">
                        
                    <v-card-text>
                    <h3>Titulo</h3> {{comp.title}}
                    </v-card-text>
                    <v-card-text>
                    <h3>Precio Unidad</h3>{{comp.unit_price}}
                    </v-card-text>
                    <v-card-text>
                    <h3>Cantidad</h3>{{comp.quantity}}
                    </v-card-text>
                    </div>

                </v-card> 
                </div>
            <v-btn @click="despacharCompra(comprados)" width="100%">
                Despachar compra
            </v-btn>
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
        comprasHechas: []
    }),

    methods: { 
        despacharCompra(comprados){
            console.log(comprados)
        }
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

</style>