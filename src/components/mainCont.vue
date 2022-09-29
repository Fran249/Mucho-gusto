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
        <v-btn @click="updateCard">
            Agregar
        </v-btn>
        <v-text-field
            v-model="title1"
            filled
            label="Agrega un Titulo"
            clearable
          >
        </v-text-field>
        <v-text-field
            v-model="src1"
            filled
            label="Agrega un link de imagen"
            clearable
          ></v-text-field>
          <v-text-field
            v-model="flex1"
            filled
            label="Agrega una cantidad de columnas"
            clearable
          ></v-text-field>
        <v-row >
            <v-col 
            v-for="card in cards" :key="card.title"
            :cols="card.flex">
                <v-card width="250px" height="500px">
                    <v-img :src="card.src" width="250px">

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
                                Comprar
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
    import { getFirestore, doc, onSnapshot,updateDoc, arrayUnion,  } from "firebase/firestore";
    import { initializeApp } from 'firebase/app';
    import { firebaseConfig} from '../firebase/index'
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    export default {
        name: 'mainCont',
        data: ()=>({
            title1: '',
            src1: '',
            flex1: '',


            cards: null,
        }),
        mounted(){
            onSnapshot(doc(db, "AdminStock/v-card1"), (doc) => {
                
                this.cards = doc.data().cards;


            });
        },
        methods:{

            updateCard(){
                const cardRef = doc(db, "AdminStock/v-card1");
                updateDoc(cardRef, {
                cards: arrayUnion({title: this.title1,src: this.src1, flex: this.flex1}),
            });
            }


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