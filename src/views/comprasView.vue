<template>
  <div>
    <navBarAdmin />
    <div class="d-flex flex-column"  style="width: 100%" v-if="comprasHechas.length >=1">
      <h3 class="ma-15 text-center" style="font-size: 20px;">COMPRAS DE HOY {{new Date().toLocaleString('es-AR', {timeZone: 'America/Argentina/Buenos_Aires'})}}</h3>
      <div class="bar-container-title ml-15"></div>
    </div>
    <div class="d-flex flex-column"  style="width: 100%" v-else>
      <h3 class="ma-15 text-center" style="font-size: 20px;">NO HAY COMPRAS HECHAS EL DIA DE HOY</h3>
      <div class="bar-container-title ml-15"></div>
    </div>
    <v-row >
       
      <v-col
        cols="12"
        sm="6"
        md="6"
        xl="4"
        v-for="comprados in comprasHechas"
        :key="comprados.nombre"
      >
        <v-container fill-height>
          <div class="d-flex flex-row ma-5">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-card-title class="ma-10" v-bind="attrs" v-on="on"
                        >
                        <div class="d-flex flex-row" >
                            <h3 class="mr-3">{{ comprados.nombre }}</h3>
                            <h3>{{ comprados.fecha }}</h3>
                        </div>
                        </v-card-title
                      >
                    </template>
                    <span>Nombre y Fecha</span>
                  </v-tooltip>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="d-flex flex-column align-center">
                    <v-expansion-panels class="ma-5">
                        <v-expansion-panel>
                            <v-expansion-panel-header >
                                <div class="d-flex flex-column" >
                                    <h3 class="ma-15 text-left">DATOS DE USUARIO</h3>
                                    <div class="bar-container"></div>
                                </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-card >
                      <div>
                        <v-divider class="ma-3"></v-divider>
                        <v-card-text class="mb-1"
                          ><h3>Email:</h3>
                          {{ comprados.email }}</v-card-text
                        >
                        <v-divider class="ma-3"></v-divider>
                        <v-card-text class="mb-1"
                          ><h3>Telefono:</h3>
                          {{ comprados.number_phone }}</v-card-text
                        >
                        <v-divider class="ma-3"></v-divider>
                        <v-card-text class="mb-1"
                          ><h3>Direccion:</h3>
                          {{ comprados.direccion }}</v-card-text
                        >
                        <v-divider class="ma-3"></v-divider>
                        <v-card-text class="mb-1"
                          ><h3>Estado de compra:</h3>
                          {{ comprados.estado }}</v-card-text
                        >
                        <v-divider class="ma-3"></v-divider>
                        <v-card-text class="mb-1"
                          ><h3>Fecha:</h3>
                          {{ comprados.fecha }}</v-card-text
                        >
                        <v-divider class="ma-3"></v-divider>
                        <v-card-text class="mb-1"
                          ><h3>TOTAL:</h3>
                          {{ comprados.total }}</v-card-text
                        >
                      </div>
                    </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <v-expansion-panels v-for="comp in comprados.items" :key="comp.title">
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <div class="d-flex flex-column">
                                    <h3 class="ma-12">{{ comp.title.toLocaleUpperCase() }}</h3>
                                <div class="bar-container"></div>
                                </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-card >
                      <div>
   
                        <v-divider class="mt-5 ml-5 mr-5"></v-divider>
                        <v-card-text>
                          <h3 class="mb-4">Titulo:</h3>
                          {{ comp.title }}
                          <v-avatar>
                                <v-img width="100" height="100" contain :src="comp.picture_url"></v-img>
                            </v-avatar>
                        </v-card-text>
                        <v-divider class="ma-3"></v-divider>
                        <v-card-text>
                          <h3 class="mb-5">Precio /U:</h3>
                          {{ comp.unit_price }}
                        </v-card-text>
                        <v-divider class="ma-3"></v-divider>
                        <v-card-text>
                          <h3 class="mb-5">Cantidad:</h3>
                          {{ comp.quantity }}
                        </v-card-text>
                      </div>
                    </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                   
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-container>
      </v-col>
    </v-row>
    <div class="d-flex justify-end mr-5">
      <v-btn v-if="comprasHechas.length >= 1" @click="exportPDF">
      Descargar pdf 
    </v-btn>
    </div>
  </div>
</template>

<script>
import navBarAdmin from "@/components/navBarAdmin.vue";
import { getFirestore, collection, query, getDocs , doc, deleteDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/index";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default {
  name: "comprasView",
  components: {
    navBarAdmin,
  },
  data: () => ({
    comprasHechas: [],
    arrayNuevo : [],
    dialogLoading: true

  }),

  methods: {
    despacharCompra(comprados) {
      console.log(comprados);
    },
    exportPDF(){
      const dc = new jsPDF()
      
      this.comprasHechas.forEach(element=>{
         const info = {
          nombre: element.nombre,
          direccion: element.direccion,
          dni : element.number_dni,
          celular : element.number_phone,
          total: element.total,
          fecha: element.fecha,
          email : element.email
         }
          
         element.items.forEach(element=>{
         const  items = {
          titulo: element.title,
          precio: element.unit_price,
          cantidad: element.quantity
         }
         
         Object.assign(info, items)
        
          this.arrayNuevo.push(info)
          console.log(this.arrayNuevo)
         })

      })
      

      autoTable(dc, {
  columnStyles: { nombre: { halign: 'center' , cellWidth: '10'},
                  email: { halign: 'center', cellWidth: '10' }, 
                  celular: { halign: 'center' , cellWidth: '10'}, 
                  dni: { halign: 'center' , cellWidth: '10'},
                  fecha: { halign: 'center', cellWidth: '10' } ,
                  titulo: { halign: 'center', cellWidth: '10', cellPadding: '10'} , 
                  precio: { halign: 'center',cellWidth: '10'},
                  cantidad: {halign : 'center', cellWidth: '10'},
                  total: {halign: 'total', cellWidth: '10'}},
  body: this.arrayNuevo,
  columns: [
    { header: 'Nombre', dataKey: 'nombre' },
    { header: 'Email', dataKey: 'email' },
    { header: 'Celular', dataKey: 'celular' },
    { header: 'DNI', dataKey: 'dni' },
    { header: 'Fecha', dataKey: 'fecha' },
    { header: 'Titulo', dataKey: 'titulo' },
    { header: 'Precio', dataKey: 'precio' },
    { header: 'Cantidad', dataKey: 'cantidad' },
    { header: 'Total', dataKey: 'total' },

  ],
})
dc.save(`compras de ${new Date().toLocaleString('es-AR', {timeZone: 'America/Argentina/Buenos_Aires'})}`) 
  this.comprasHechas.forEach(element=>{
    deleteDoc(doc(db, "Compras",`${element.id}`));
  })
    setTimeout(()=>{
    location.reload()
  } ,4000)
 
  
    }


    },
  beforeCreate() {
    const q = query(collection(db, "Compras"));

    getDocs(q).then((resolve) => {
      resolve.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.comprasHechas.push(doc.data());
      });
    });
  },
  mounted() {
    console.log(this.comprasHechas);
  },

};
</script>

<style lang="scss" scoped>
h3 {
  font-family: "humanst521_btbold";
  color: black;
  font-size: 18px;
}

.bar-container{
  width: 100%;
  height: 2px;
  display: flex;
  flex-direction: row;
  background: rgb(242,192,74);
  background: linear-gradient(90deg, rgba(242,192,74,1) 140px, rgba(179,182,188,1) 140px);
}
.bar-container-title{
    width: 90%;
  height: 0.3rem;
  display: flex;
  flex-direction: row;
  background: rgb(242,192,74);
  background: linear-gradient(90deg, rgba(242,192,74,1) 350px, rgba(179,182,188,1) 140px);
}
</style>
