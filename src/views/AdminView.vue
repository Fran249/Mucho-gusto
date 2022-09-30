<template>
    <div>
        <navBar/>
        <v-container>

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
            v-model="id"
            filled
            label="Identifica con un ID"
            clearable
          ></v-text-field>
          <v-btn @click="updateCard">
            Agregar
        </v-btn>
        </v-container>
        <v-container>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">
                       Nombre
                    </th>
                    <th class="text-left">
                        Src
                    </th>
                    <th class="text-left">
                        ID
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="prod in productos"
                    :key="prod.title"
                    
                    >
                    <td >{{ prod.title }} </td>
                    <td>{{ prod.src }} </td>
                    <td>{{ prod.id }} </td>
                    <v-btn @click="borrarCard(prod)">Borrar articulo</v-btn>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </v-container>
    </div>
</template>


<script>
    import { getFirestore, doc, updateDoc, arrayUnion ,arrayRemove, onSnapshot} from "firebase/firestore";
    import { initializeApp } from 'firebase/app';
    import { firebaseConfig} from '../firebase/index'
    import navBar from "@/components/navBar.vue";
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);



    export default{
        name: 'AdminView',
        components:{
            navBar,
        },
        data:()=>({
            title1: '',
            src1: '',
            id: '',
            productos: null,
            
        }),

        methods:{


            updateCard(){
                const cardRef = doc(db, "AdminStock/v-card1");
                updateDoc(cardRef, {
                cards: arrayUnion({title: this.title1,src: this.src1, id: this.id}),
                
            });
                
                this.title1 = '',
                this.src1 = '',
                this.id = ''
                
            },
            borrarCard(prod){

                const cardRef = doc(db, "AdminStock/v-card1");
                updateDoc(cardRef, {
                cards: arrayRemove({ title: prod.title, src: prod.src, id: prod.id })
            });
                
            },

        },
        mounted(){
            onSnapshot(doc(db, "AdminStock/v-card1"), (doc) => {
                
                

                this.productos = doc.data().cards;


            });
        },
    }
</script>