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
            <v-col cols="12" md="12" sm="12" v-for="compras in comprasHechas" :key="compras.items">
                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <h3>{{ compras.fecha }}</h3>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content >
                            <div class="card"  v-for="items in compras.items" :key="items.src">
                                <div >
                                    <v-img width="100" height="100" :src="items.picture_url">
                                    </v-img>
                                </div>
                                <div class="d-flex flex-column justify-space-between" >
                                <h3>{{ items.title }}</h3>
                                <p>
                                ${{ items.unit_price }} C/U
                                </p>
                                </div>
                                
                            </div>
                            <h3>Total: {{compras.total}}</h3>  
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
                <!--<v-card class="mt-15" >
                    <v-card-text>
                        {{compras.fecha}}
                    </v-card-text>
                    <div class="pa-5">
                        <h3 class="ml-5 articulos">ARTÍCULOS</h3>
                    <div class="bar-container"></div>
                    </div>
                    <v-card-text v-for="items in compras.items" :key="items.unit_price">
                        <div class="d-flex flex-row">
                            <v-card>
                            <v-card-title>
                                <h3 class="articulos">{{items.title}}</h3>
                            </v-card-title>
                            <v-card-text>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <div class="d-flex flex-row" style="gap: 5px;">
                                                <h3>Cantidad:</h3>
                                                <h3>{{items.quantity}}</h3>
                                            </div>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-divider class="mt-2 mb-2"></v-divider>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <h3>Precio/U: ${{items.unit_price}}</h3>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-divider class="mt-1 mb-2"></v-divider>
                            </v-card-text>
                        </v-card>
                            <v-img  width="100" :src="items.picture_url"></v-img>
                        </div>
                    </v-card-text>
                    <div class="d-flex flex-row justify-space-between mt-5 mb-5" style="height: 50px;">
                        <h3 class="ml-5 total">TOTAL:</h3>
                        <h3 class="pr-3">${{compras.total}}</h3>
                    </div>
                </v-card>-->
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

.card{
    padding: 20px;
    border: 1px solid #000;
    border-radius: 10px;
    border-width: 2px;
    border-color: grey;
    display: flex;
    flex-direction: row;
    gap: 10px
}

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