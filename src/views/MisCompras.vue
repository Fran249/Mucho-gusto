<template>
    <div>
    <nav-bar/>
    <v-navigation-drawer
        fixed
        temporary
        right 
        v-model="carritoCompra"
        touchless
        :width="widthPercent()">
         <Carrito :key="componentKey"/>
        </v-navigation-drawer>
        <v-container>
            <div class="mb-10">
            <h3 class="mi-compra mb-2">MIS COMPRAS</h3>
            <div class="bar-container">
            </div>
            </div>
        <v-row>
            <v-col cols="12" md="6" sm="6" v-for="compras in comprasHechas" :key="compras.items">
                <v-card class="mt-15">
                    <v-card-text>
                        {{compras.fecha}}
                    </v-card-text>
                    <h3 class="ml-5 articulos">Articulos</h3>
                    <v-card-text v-for="items in compras.items" :key="items.unit_price">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title class="mb-3">
                                        {{items.title}}
                                        </v-list-item-title>
                                        <v-list-item-subtititle class="mb-3">
                                        {{items.quantity}}
                                        </v-list-item-subtititle>
                                        {{items.unit_price}}
                                    </v-list-item-content>

                                </v-list-item>
                    </v-card-text>
                    <h3 class="ml-5 total">Total: {{compras.total}}</h3>
                </v-card>
            </v-col>
        </v-row>
        </v-container>

    </div>
</template>

<script>
import navBar from '../components/navBar.vue'
import Carrito from '../components/Carrito.vue'
import store from '@/store';
import { mapState , mapGetters } from 'vuex'
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
    import { initializeApp } from 'firebase/app';
    import {  auth, firebaseConfig} from '../firebase/index'
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    export default {

        name: 'MisCompras',
        components:{
            navBar,
            Carrito
        },
        data:()=>({
    componentKey: store.state.forceRenderCarrito,
    width: window.innerWidth,
    comprasHechas: [],
  }),
 watch:{
  componentKey(){
    this.componentKey = store.state.forceRenderCarrito
    
  }
  
 },
 methods:{
  widthPercent(){
    if(window.innerWidth >960){
        return '25%'
    }else {
      return '100%'
    }
  },
  mostrarInfo(){
    console.log(this.comprasHechas)
  }
 },
 computed: {
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
 beforeCreate(){

                
    },
    mounted(){
        const q = query(collection(db, `Usuarios/${auth.currentUser.uid}/Compras`));
                
                getDocs(q).then(resolve =>{
                    resolve.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                    this.comprasHechas.push(doc.data())
                    console.log(this.comprasHechas)
                
                });
                })
    },

}
</script>

<style>
    .mi-compra{
    font-family: 'humanst521_btbold';
    color: black;
    font-size: 20px;
}
.total, .articulos{

    font-family: 'humanst521_btbold';
    color: black;
}
.bar-container{
  width: 100%;
  height: 0.2rem;
  display: flex;
  flex-direction: row;
  background: rgb(242,192,74);
  background: linear-gradient(90deg, rgba(242,192,74,1) 140px, rgba(179,182,188,1) 140px);
}

</style>