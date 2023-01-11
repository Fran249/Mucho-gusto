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
                <v-expansion-panels >
                    <v-expansion-panel>
                        <v-expansion-panel-header  style="border: 0.01px solid gray; border-radius: 10px;
border-bottom-right-radius: 1px;
border-bottom-left-radius: 1px; padding: 15px" >
                            <h3 class="titles">{{ compras.fecha }}</h3>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content   >
                            <div class="d-flex flex-row justify-space-between" style="border: 0.01px solid gray; border-radius: 1px;
border-bottom-right-radius: 5px;
border-bottom-left-radius: 5px; padding: 15px"  v-for="items in compras.items" :key="items.src">
                                <div class="d-flex flex-row" style="gap: 15px" >
                                    <div >
                                    <v-img width="150" height="150" :src="items.picture_url">
                                    </v-img>
                                </div>
                                <div class="d-flex flex-column text-1" >
                                <h3>{{ items.title }}</h3>
                                <p>{{items.description}}</p>
                                <p>{{items.quantity}} Articulos</p>
                                <div class="d-flex flex-row justify-space-between text-1 totales" >
                                    <p>
                                ${{ items.unit_price }} C/U
                                </p>
                                <h3 style="color: #6e6e6e">${{compras.total}}</h3>    
                                </div>
                                </div>
                                
                                </div>
                                <v-btn color="#febf2c" disabled class="align-self-center">
                                    <div class="d-flex flex-row">
                                        <p class="mt-4 p-v-btn ">
                                    VOLVER A COMPRAR
                                    </p>
                                    <v-icon class="ml-2" color="white">
                                        mdi-briefcase
                                    </v-icon>
                                    </div>
                                </v-btn>
                            </div>
                            
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
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

<style lang="scss" scoped>


.p-v-btn{
    font-family: 'humanst521_btbold';
    color: #fff
}
    .v-btn {
  text-transform:none !important;
}
.v-expansion-panel-content__wrap{
    padding: 0;

}
.titles{
    font-family: 'humanst521-1';
    color: #6e6e6e;
}
.v-aplication p{
    padding: 0;
    margin-bottom: 0;

}
p{
    font-family: 'humanst521-1';
    color: #6e6e6e;
}
.text1 h3{
    font-family: 'humanst521_btbold';
    color: #000;
}
.totales {
    gap: 300%
}
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
@media screen and (max-width: 960px) {
    .totales {
    gap: 15%
}
}
</style>