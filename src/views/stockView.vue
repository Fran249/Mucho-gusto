<template>
  <div>
    <navBarAdmin />
    <v-container class="container">
      <div class="mb-10">
        <H3>STOCK</H3>
        <div class="bar-container">
        </div>
      </div>
      <h3 class="subTitle">SALADO/SIMPLES</h3>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">NOMBRE</th>
              <th class="text-left">ID</th>
              <th class="text-left">STOCK</th>
              <th class="text-left">PRECIO UD</th>
              <th class="text-left">EDITAR</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prod in productoSimple" :key="prod.title">
              <td><v-img width="60px" height="60px" :src="prod.src"></v-img></td>
              <td>{{ prod.title }}</td>
              <td>{{ prod.id }}</td>
              <td v-if="prod.cantidad >= 0">{{ prod.cantidad }}</td>
              <td v-if="prod.cantidad < 1">SIN STOCK</td>
              <td>$ {{ prod.precio }}</td>
              <td>
                <v-btn class="mb-5 mr-5" icon >
                  <v-icon color="#9d9c9c"> mdi-file-image </v-icon>
                </v-btn>
                <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" class="mb-5 mr-5" icon @click="cambiarBtnToID(prod) " >
                    <v-icon color="#9d9c9c"> mdi-barcode </v-icon>
                  </v-btn>
                </template>
                <span>Editar ID</span>
                </v-tooltip>
                <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="mb-5 mr-5" icon @click="cambiarBtnTo(prod)">
                  <v-icon color="#9d9c9c"> mdi-package-variant </v-icon>
                </v-btn>
                </template>
                <span>Editar stock</span>
                </v-tooltip>
                <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="mb-5 mr-5" icon @click="cambiarBtnToPrice(prod)" >
                  <v-icon color="#9d9c9c"> mdi-cash </v-icon>
                </v-btn>
                </template>
                <span>Cambiar precio</span>
                </v-tooltip>
                <v-divider class="mt-5" vertical inset></v-divider>
                <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="mb-5 ml-3" @click="borrarCard(prod)" text icon>
                  <v-icon color="red"> mdi-delete </v-icon>
                </v-btn>
                </template>
                <span>Borrar articulo</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
    <v-container>
      <h3 class="subTitle">SALADO/RELLENOS</h3>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">NOMBRE</th>
              <th class="text-left">ID</th>
              <th class="text-left">STOCK</th>
              <th class="text-left">PRECIO UD</th>
              <th class="text-left">EDITAR</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prod in productoRelleno" :key="prod.title">
              <td><v-img width="60px" height="60px" :src="prod.src"></v-img></td>
              <td>{{ prod.title }}</td>
              <td>{{ prod.id }}</td>
              <td v-if="prod.cantidad >= 0">{{ prod.cantidad }}</td>
              <td v-if="prod.cantidad < 1">SIN STOCK</td>
              <td>$ {{ prod.precio }}</td>
              <td>
                <v-btn class="mb-5 mr-5" icon >
                  <v-icon color="#9d9c9c"> mdi-file-image </v-icon>
                </v-btn>
                <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" class="mb-5 mr-5" icon @click="cambiarBtnToID(prod) " >
                    <v-icon color="#9d9c9c"> mdi-barcode </v-icon>
                  </v-btn>
                </template>
                <span>Editar ID</span>
                </v-tooltip>
                <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="mb-5 mr-5" icon @click="cambiarBtnTo(prod)">
                  <v-icon color="#9d9c9c"> mdi-package-variant </v-icon>
                </v-btn>
                </template>
                <span>Editar stock</span>
                </v-tooltip>
                <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="mb-5 mr-5" icon @click="cambiarBtnToPrice(prod)" >
                  <v-icon color="#9d9c9c"> mdi-cash </v-icon>
                </v-btn>
                </template>
                <span>Cambiar precio</span>
                </v-tooltip>
                <v-divider class="mt-5" vertical inset></v-divider>
                <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="mb-5 ml-3" @click="borrarCard(prod)" text icon>
                  <v-icon color="red"> mdi-delete </v-icon>
                </v-btn>
                </template>
                <span>Borrar articulo</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
    <v-container>
      <h3 class="subTitle">DULCES</h3>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">NOMBRE</th>
              <th class="text-left">ID</th>
              <th class="text-left">STOCK</th>
              <th class="text-left">PRECIO UD</th>
              <th class="text-left">EDITAR</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prod in productoDulces" :key="prod.title">
              <td><v-img width="60px" height="60px" :src="prod.src"></v-img></td>
              <td>{{ prod.title }}</td>
              <td>{{ prod.id }}</td>
              <td v-if="prod.cantidad >= 0">{{ prod.cantidad }}</td>
              <td v-if="prod.cantidad < 1">SIN STOCK</td>
              <td>$ {{ prod.precio }}</td>
              <td>
                <v-btn class="mb-5 mr-5" icon >
                  <v-icon color="#9d9c9c"> mdi-file-image </v-icon>
                </v-btn>
                <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" class="mb-5 mr-5" icon @click="cambiarBtnToID(prod) " >
                    <v-icon color="#9d9c9c"> mdi-barcode </v-icon>
                  </v-btn>
                </template>
                <span>Editar ID</span>
                </v-tooltip>
                <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="mb-5 mr-5" icon @click="cambiarBtnTo(prod)">
                  <v-icon color="#9d9c9c"> mdi-package-variant </v-icon>
                </v-btn>
                </template>
                <span>Editar stock</span>
                </v-tooltip>
                <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="mb-5 mr-5" icon @click="cambiarBtnToPrice(prod)" >
                  <v-icon color="#9d9c9c"> mdi-cash </v-icon>
                </v-btn>
                </template>
                <span>Cambiar precio</span>
                </v-tooltip>
                <v-divider class="mt-5" vertical inset></v-divider>
                <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="mb-5 ml-3" @click="borrarCard(prod)" text icon>
                  <v-icon color="red"> mdi-delete </v-icon>
                </v-btn>
                </template>
                <span>Borrar articulo</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
    <v-container>
      <h3 class="subTitle">PANIFICADOS</h3>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">NOMBRE</th>
              <th class="text-left">ID</th>
              <th class="text-left">STOCK</th>
              <th class="text-left">PRECIO UD</th>
              <th class="text-left">EDITAR</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prod in productoPanificados" :key="prod.title">
              <td><v-img width="60px" height="60px" :src="prod.src"></v-img></td>
              <td>{{ prod.title }}</td>
              <td>{{ prod.id }}</td>
              <td v-if="prod.cantidad >= 0">{{ prod.cantidad }}</td>
              <td v-if="prod.cantidad < 1">SIN STOCK</td>
              <td>$ {{ prod.precio }}</td>
              <td>
                <v-btn class="mb-5 mr-5" icon >
                  <v-icon color="#9d9c9c"> mdi-file-image </v-icon>
                </v-btn>
                <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" class="mb-5 mr-5" icon @click="cambiarBtnToID(prod) " >
                    <v-icon color="#9d9c9c"> mdi-barcode </v-icon>
                  </v-btn>
                </template>
                <span>Editar ID</span>
                </v-tooltip>
                <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="mb-5 mr-5" icon @click="cambiarBtnTo(prod)">
                  <v-icon color="#9d9c9c"> mdi-package-variant </v-icon>
                </v-btn>
                </template>
                <span>Editar stock</span>
                </v-tooltip>
                <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="mb-5 mr-5" icon @click="cambiarBtnToPrice(prod)" >
                  <v-icon color="#9d9c9c"> mdi-cash </v-icon>
                </v-btn>
                </template>
                <span>Cambiar precio</span>
                </v-tooltip>
                <v-divider class="mt-5" vertical inset></v-divider>
                <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="mb-5 ml-3" @click="borrarCard(prod)" text icon>
                  <v-icon color="red"> mdi-delete </v-icon>
                </v-btn>
                </template>
                <span>Borrar articulo</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
    <v-dialog v-model="dialogEdit" persistent width="500">
      <form class="v-dialog" v-if="idEdit == true">
        <div class="d-flex flex-row justify-end">
          <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
          <v-btn icon text v-bind="attrs"
          v-on="on" @click="closeAll()">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
          </template>
          <span>Cerrar</span>
        </v-tooltip>
        </div>
        <v-text-field v-model="idEditado" filled label="Editar ID">
        </v-text-field>
        <v-btn width="200px" @click="editarID()" class="mr-15 mt-10" color="#febf2c" height="40">
          <p class="p-agregar mt-4">
            Guardar Cambios
          </p> 
        </v-btn>
      </form>
      <form class="v-dialog" v-if="priceEdit == true">
        <div class="d-flex flex-row justify-end">
          <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
          <v-btn icon text v-bind="attrs"
          v-on="on" @click="closeAll()">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
          </template>
          <span>Cerrar</span>
        </v-tooltip>
        </div>
        <v-text-field v-model="precioEditado" filled label="Editar Precio">
        </v-text-field>
        <v-btn width="200px" @click="editarPrecio()" class="mr-15 mt-10" color="#febf2c" height="40">
          <p class="p-agregar mt-4">
            Guardar Cambios
          </p> 
        </v-btn>
      </form>
      <form class="v-dialog" v-if="editCantidad == true">
        <div class="d-flex flex-row justify-end">
          <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
          <v-btn icon text v-bind="attrs"
          v-on="on" @click="closeAll()">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
          </template>
          <span>Cerrar</span>
        </v-tooltip>
        </div>
        <v-text-field v-model="stockEditado" filled label="Editar Cantidad">
        </v-text-field>
        <v-btn width="200px" @click="editarStock()" class="mr-15 mt-10" color="#febf2c" height="40">
          <p class="p-agregar mt-4">
            Guardar Cambios
          </p> 
        </v-btn>
      </form>

    </v-dialog>
  </div>
</template>

<script>
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
//import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/index";
import navBarAdmin from "@/components/navBarAdmin.vue";

//const auth = getAuth();
const storage = getStorage();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
  name: "stockView",
  components: {
    navBarAdmin,
  },
  data: () => ({
    selectedCategory: null,
    items: [
      { categoryName: "Salados" },
      { categoryName: "Panificados" },
      { categoryName: "Dulce" },
    ],
    title1: "",
    src1: "",
    id: "",
    precio: "",
    hidden: false,
    productoSimple: [],
    productoRelleno: [],
    productoDulces: [],
    productoPanificados: [],
    UploadValue: 0,
    imagenes: [],
    selectedFile: null,
    stockEditado: "",
    idEditado:'',
    stock: "",
    clickedit: true,
    cambiarBtn: false,
    prodTitle: "",
    prodSrc: "",
    prodId: "",
    prodCantidad: "",
    prodPrecio: "",
    prodValue: "",
    dialogEdit: false,
    rutaID: '',
    rutaAgregar: '',
    editCantidad: false,
    idEdit : false,
    priceEdit: false,
    precioEditado: '',
  }),
  watch: {
    rutaID(){
      if(this.rutaID == 'DC'){
        this.rutaAgregar = 'Dulce'
      } else if(this.rutaID == 'PN'){
        this.rutaAgregar = 'Panificados'
      } else if(this.rutaID == 'SS'){
        this.rutaAgregar = 'SaladosSimples'
      } else if(this.rutaID == 'SR'){
        this.rutaAgregar = 'SaladosRellenos'
      }
    }
  },

  methods: {
    closeAll(){
   
      this.idEdit = false
      this.editCantidad= false
      this.priceEdit = false
      this.dialogEdit = false
      this.precioEditado = ''
      this.stockEditado = ''
      this.idEditado = ''
    },
    changeValue() {
      if (window.innerWidth >= 1400) {
        return 10;
      } else {
        return 9;
      }
    },
    cambiarBtnTo(prod) {
      this.dialogEdit = true;
      this.editCantidad = true;
      this.prodTitle = prod.title;
      this.prodSrc = prod.src;
      this.prodId = prod.id;
      this.prodCantidad = prod.cantidad;
      this.prodPrecio = prod.precio;
      this.prodValue = prod.value;
      this.rutaID= prod.idRoute
    },
    cambiarBtnToID(prod){
      this.dialogEdit = true;
      this.idEdit = true;
      this.prodTitle = prod.title;
      this.prodSrc = prod.src;
      this.prodId = prod.id;
      this.prodCantidad = prod.cantidad;
      this.prodPrecio = prod.precio;
      this.prodValue = prod.value;
      this.rutaID= prod.idRoute
    },
    cambiarBtnToPrice(prod){
      this.dialogEdit = true;
      this.priceEdit= true
      this.prodTitle = prod.title;
      this.prodSrc = prod.src;
      this.prodId = prod.id;
      this.prodCantidad = prod.cantidad;
      this.prodPrecio = prod.precio;
      this.prodValue = prod.value;
      this.rutaID= prod.idRoute
    },
    editarStock() {
      
      const cardRef = doc(db, `AdminStock/${this.rutaAgregar}`);
      updateDoc(cardRef, {
        cards: arrayRemove({
          title: this.prodTitle,
          src: this.prodSrc,
          id: this.prodId,
          cantidad: this.prodCantidad,
          idRoute: this.rutaID,
          precio: this.prodPrecio,
          value: this.prodValue,
        }),
      });
      updateDoc(cardRef, {
        cards: arrayUnion({
          title: this.prodTitle,
          src: this.prodSrc,
          id: this.prodId,
          cantidad: this.stockEditado,
          idRoute: this.rutaID,
          precio: this.prodPrecio,
          value: this.prodValue,
        }),
      });
      this.stockEditado = "";
      this.editCantidad = false
      this.dialogEdit = false;
    },
    editarID() {

      const cardRef = doc(db, `AdminStock/${this.rutaAgregar}`);
      updateDoc(cardRef, {
        cards: arrayRemove({
          title: this.prodTitle,
          src: this.prodSrc,
          id: this.prodId,
          cantidad: this.prodCantidad,
          idRoute: this.rutaID,
          precio: this.prodPrecio,
          value: this.prodValue,
        }),
      });
      updateDoc(cardRef, {
        cards: arrayUnion({
          title: this.prodTitle,
          src: this.prodSrc,
          id: this.idEditado,
          cantidad: this.prodCantidad,
          idRoute: this.rutaID,
          precio: this.prodPrecio,
          value: this.prodValue,
        }),
      });
      this.idEditado = '';
      this.idEdit = false;
      this.dialogEdit = false;
},
    editarPrecio() {

    const cardRef = doc(db, `AdminStock/${this.rutaAgregar}`);
    updateDoc(cardRef, {
      cards: arrayRemove({
        title: this.prodTitle,
        src: this.prodSrc,
        id: this.prodId,
        cantidad: this.prodCantidad,
        idRoute: this.rutaID,
        precio: this.prodPrecio,
        value: this.prodValue,
      }),
    });
    updateDoc(cardRef, {
      cards: arrayUnion({
        title: this.prodTitle,
        src: this.prodSrc,
        id: this.idEditado,
        cantidad: this.prodCantidad,
        idRoute: this.rutaID,
        precio: this.precioEditado,
        value: this.prodValue,
      }),
    });

    this.precioEditado = "";
    this.editarPrecio = false;
    this.dialogEdit = false;
    },
    updateCard() {
      const cardRef = doc(
        db,
        `AdminStock/${this.selectedCategory.categoryName}`
      );
      updateDoc(cardRef, {
        cards: arrayUnion({
          title: this.title1,
          src: this.src1,
          id: this.id,
          cantidad: this.stock,
          precio: this.precio,
          value: 1,
        }),
      });

      (this.title1 = ""),
        (this.src1 = ""),
        (this.id = ""),
        (this.stock = ""),
        (this.precio = ""),
        setTimeout(this.actualizarPagina, 1500);
    },
    borrarCard(prod) {

      this.rutaID = prod.idRoute
      
      if(this.rutaID == 'DC'){
        this.rutaAgregar = 'Dulce'
      } else if(this.rutaID == 'PN'){
        this.rutaAgregar = 'Panificados'
      } else if(this.rutaID == 'SS'){
        this.rutaAgregar = 'SaladosSimples'
      } else if(this.rutaID == 'SR'){
        this.rutaAgregar = 'SaladosRellenos'
      }



      const cardRef = doc(db, `AdminStock/${this.rutaAgregar}`);
      updateDoc(cardRef, {
        cards: arrayRemove({
          title: prod.title,
          src: prod.src,
          id: prod.id,
          cantidad: prod.cantidad,
          precio: prod.precio,
          value: prod.value,
          idRoute: prod.idRoute
        }),
      });
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    onUpload() {
      const storageRef = ref(storage, `/AdminStock/${this.selectedFile.name}`);
      // eslint-disable-next-line no-unused-vars
      uploadBytesResumable(storageRef, this.selectedFile).then((snapshot) => {
        //////////////////////------Barra de progreso-----//////////////////////
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.UploadValue = progress;

        setTimeout(this.actualizarPagina, 1500);
      });
    },
    actualizarPagina() {
      location.reload();
    },
    seleccionarImg(imagen) {
      console.log(imagen.imagen);
      this.src1 = imagen.imagen;
      this.hidden = true;
      setTimeout(this.quitarAlerta, 1500);
    },
    quitarAlerta() {
      this.hidden = false;
    },
    eliminarImg(imagen) {
      if (confirm("Seguro que quieres eliminar esta imagen?")) {
        const imgRef = ref(storage, `${imagen.ruta}`);

        // Delete the file
        deleteObject(imgRef)
          .then(() => {
            // File deleted successfully
            location.reload();
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);
          });
      }
    },
  },
  mounted() {
    onSnapshot(doc(db, "AdminStock/SaladosSimples"), (doc) => {
      this.productoSimple = doc.data().cards;
    });
    onSnapshot(doc(db, "AdminStock/SaladosRellenos"), (doc) => {
      this.productoRelleno = doc.data().cards;
    });
    onSnapshot(doc(db, "AdminStock/Dulce"), (doc) => {
      this.productoDulces = doc.data().cards;
    });
    onSnapshot(doc(db, "AdminStock/Panificados"), (doc) => {
      this.productoPanificados = doc.data().cards;
    });
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: humanst521-1;
  src: url("/src/assets/Humanst521LtBTLight.ttf");
}
@font-face {
  font-family: humanst521-2;
  src: url("/src/assets/Humanst521BTBold.ttf");
}
@font-face {
  font-family: humans521-3;
  src: url("/src/assets/Hum521Rm.ttf");
}
@font-face {
  font-family: "humanst521_btroman";
  src: url("/src/assets/hum521rm-webfont.woff2") format("woff2"),
    url("/src/assets/hum521rm-webfont.woff") format("woff");
}
@font-face {
  font-family: "humanst521_btbold";
  src: url("/src/assets/humanst521_bt_bold-webfont.woff2") format("woff2"),
    url("/src/assets/humanst521_bt_bold-webfont.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}
h3 {
  font-family: humanst521-2;
  font-weight: bolder;
  font-size: 25px;
}

.container {
  margin-top: 50px;
}
.v-dialog {
  background-color: white;
  margin: 0;
  width: 500px;
  padding: 50px;
  display: flex;
  flex-direction: column;
}

.p-agregar{
  font-family: humanst521-1;
  font-size: 13px;
  font-weight: bolder;
  color: #fff
}
.subTitle{
  color: rgb(102,103,104)
}
.bar-container{
  width: 100%;
  height: 0.2rem;
  display: flex;
  flex-direction: row;
  background: rgb(242,192,74);
  background: linear-gradient(90deg, rgba(242,192,74,1) 100px, rgba(179,182,188,1) 100px);
}
</style>
