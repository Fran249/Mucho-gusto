<template>
    <div>
        <navbarAdmin/>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card height="600" style="padding: 35px">
                        <v-card-title>
                            Generar código de reembolso
                        </v-card-title>
                        <div class="bar-container" style=" margin-bottom: 30px; margin-left: 10px"></div>
                        <v-text-field
                        v-model="valorCompra"
                        label="Seleccione un valor Neto para descontar"
                        ></v-text-field>
                        <v-btn
                            @click="crearCodigoNeto()"
              
              class="mb-10 pa-5"
              color="#febf2c"
              
            >
              <p class="mt-4 p-v-btn">GENERAR CÓDIGO NETO</p>
            </v-btn>
                        <v-select
                        v-model="selectedPercentage"
                        :items="items"
                        filled
                        label="Seleccione un porcentaje para descontar"
                        ></v-select>
                        
                        <v-card-actions>
                            <v-btn
                            @click="crearCodigoPorcentaje()"
              
              class="mb-10 pa-5"
              color="#febf2c"
       
            >
              <p class="mt-4 p-v-btn">GENERAR CÓDIGO EN %</p>
            </v-btn>
                        </v-card-actions>
                        <v-card-text v-if="valorDelCodigo.toString().length == 6">
                            <div >
                                <p id="myInput">
                                    CÓDIGO GENERADO:
                            {{ valorDelCodigo }}
                                </p>
                            </div>
                        </v-card-text>
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
        valorCompraNeto : '',
        selectedPercentage: '',
        percentageWithComa: '',
    }),
    methods:{
        crearCodigoPorcentaje(){
            const numeroRandom = Math.round(Math.random()*999999)
            this.valorDelCodigo = Number(numeroRandom)
            console.log(this.valorDelCodigo)

            setDoc(doc(db, "codigos", `${this.valorDelCodigo}`), {
                descuento: this.percentageWithComa,
                tipo : 'porcentaje'
                });

        },
        crearCodigoNeto(){
            const numeroRandom = Math.round(Math.random()*999999)
            this.valorDelCodigo = Number(numeroRandom)
            console.log(this.valorDelCodigo)

            setDoc(doc(db, "codigos", `${this.valorDelCodigo}`), {
                descuento: this.valorCompraNeto,
                tipo : 'neto'
                });
            setTimeout(()=>{
                location.reload()
            }, 2000)

        }
    },
    watch: {
        selectedPercentage(){
            if(this.selectedPercentage == '10%'){
                this.percentageWithComa = 0.1
            } else if(this.selectedPercentage == '20%'){
                this.percentageWithComa = 0.2
            } else if(this.selectedPercentage == '30%'){
                this.percentageWithComa = 0.3
            }  else if(this.selectedPercentage == '40%'){
                this.percentageWithComa = 0.4
            }  else if(this.selectedPercentage == '50%'){
                this.percentageWithComa = 0.5
            }  else if(this.selectedPercentage == '60%'){
                this.percentageWithComa = 0.6
            }  else if(this.selectedPercentage == '70%'){
                this.percentageWithComa = 0.7
            }  else if(this.selectedPercentage == '80%'){
                this.percentageWithComa = 0.8
            }  else if(this.selectedPercentage == '90%'){
                this.percentageWithComa = 0.9
            }  else if(this.selectedPercentage == '100%'){
                this.percentageWithComa = 1
            }
            
        }
    },
    computed: {
        valorCompra: {
            get(){
              return ''
            },
            set(value){
                this.valorCompraNeto = value
                console.log(this.valorCompraNeto)
            }
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
.p-v-btn {
  font-family: "humanst521_btbold";
  color: #fff;
}

</style>