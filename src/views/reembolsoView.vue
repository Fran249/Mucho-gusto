<template>
    <div>
        <navbarAdmin/>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card height="600" style="padding: 35px">
                        <v-card-title>
                            Generar codigo de reembolso
                        </v-card-title>
                        <div class="bar-container" style=" margin-bottom: 30px; margin-left: 10px"></div>
                        <v-select
                        v-model="selectedPercentage"
                        :items="items"
                        filled
                        label="Seleccione un porcentaje para descontar"
                        ></v-select>
                        <v-card-actions>
                            <v-btn @click="crearCodigo()" style="padding: 25px">
                                Generar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>


<script>
import navbarAdmin from '@/components/navBarAdmin.vue'
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import firebaseConfig from '../firebase/index'
const db = getFirestore(firebaseConfig);
export default {
    components:{
        navbarAdmin,
    },
    name: 'reembolsoView',
    data: ()=>({
        valorDelCodigo: 0,
        items: [
            '10%',
            '20%',
            '30%',
            '40%',
            '50%',
            '60%',
            '70%',
            '80%',
            '90%',
            '100%',
        ],
        selectedPercentage: ''

    }),
    methods:{
        crearCodigo(){
            const numeroRandom = Math.floor(Math.random() * 1000000)
            this.valorDelCodigo = Number(numeroRandom)

            setDoc(doc(db, "codigos", `${this.valorDelCodigo}`), {
                descuento: this.selectedPercentage,
                });

        }
    }
}


</script>


<style lang="scss" scoped>


.bar-container{
  width: 95%;
  height: 0.2rem;
  display: flex;
  flex-direction: row;
  background: rgb(242,192,74);
  background: linear-gradient(90deg, rgba(242,192,74,1) 70px, rgba(179,182,188,1) 70px);
}


</style>