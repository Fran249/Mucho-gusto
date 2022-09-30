<template>
    <!--<div>
        <h3>CONTENIDO MAIN</h3>
        <div>
      <h1 v-if="usuario.rol == 'admin' ">Admin</h1>
      <h2 v-if="usuario.rol == 'user' ">User</h2>
      <p>{{usuario}}</p>     
  </div>
    </div>-->
    <v-container>
        <v-row >
            <v-col 
            v-for="card in cards" :key="card.title"
            cols="3" >
                <v-card width="250px" height="500px">
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
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text>
                            <h3 class="v-btn-comprar">
                                Agregar al carrito
                            </h3>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
    import { mapState } from 'vuex'
    import { getFirestore, doc, onSnapshot  } from "firebase/firestore";
    import { initializeApp } from 'firebase/app';
    import { firebaseConfig} from '../firebase/index'
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    export default {
        name: 'mainCont',
        data: ()=>({

            cards: null,
        }),
        mounted(){
            onSnapshot(doc(db, "AdminStock/v-card1"), (doc) => {
                
                this.cards = doc.data().cards;


            });
        },
        methods:{


        },
         computed:{
      ...mapState(['usuario']),
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
</style>