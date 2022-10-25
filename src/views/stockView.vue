<template>
  <div>
    <navBarAdmin />
    <v-container>
      <H3>STOCK</H3>
      <v-progress-linear
        background-color="#b3b6bc"
        color="#f2c04a"
        :value="changeValue()"
        class="mb-10"
      >
      </v-progress-linear>
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
                <v-btn class="mb-5 mr-5" icon @click="cambiarBtnToID(prod) " >
                  <v-icon color="#9d9c9c"> mdi-barcode </v-icon>
                </v-btn>
                <v-btn class="mb-5 mr-5" icon >
                  <v-icon color="#9d9c9c"> mdi-file-image </v-icon>
                </v-btn>
                <v-btn class="mb-5 mr-5" icon @click="cambiarBtnTo(prod)">
                  <v-icon color="#9d9c9c"> mdi-grease-pencil </v-icon>
                </v-btn>
                <v-divider class="mt-5" vertical inset></v-divider>
                <v-btn class="mb-5 ml-3" @click="borrarCard(prod)" text icon>
                  <v-icon color="red"> mdi-delete </v-icon>
                </v-btn>
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
                <v-btn class="mb-5 mr-5" icon @click="cambiarBtnTo(prod)">
                  <v-icon color="#9d9c9c"> mdi-barcode </v-icon>
                </v-btn>
                <v-btn class="mb-5 mr-5" icon @click="cambiarBtnTo(prod)">
                  <v-icon color="#9d9c9c"> mdi-file-image </v-icon>
                </v-btn>
                <v-btn class="mb-5 mr-5" icon @click="cambiarBtnTo(prod)">
                  <v-icon color="#9d9c9c"> mdi-grease-pencil </v-icon>
                </v-btn>
                <v-divider class="mt-5" vertical inset></v-divider>
                <v-btn class="mb-5 ml-3" @click="borrarCard(prod)" text icon>
                  <v-icon color="red"> mdi-delete </v-icon>
                </v-btn>
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
                <v-btn class="mb-5 mr-5" icon @click="cambiarBtnTo(prod)">
                  <v-icon color="#9d9c9c"> mdi-barcode </v-icon>
                </v-btn>
                <v-btn class="mb-5 mr-5" icon @click="cambiarBtnTo(prod)">
                  <v-icon color="#9d9c9c"> mdi-file-image </v-icon>
                </v-btn>
                <v-btn class="mb-5 mr-5" icon @click="cambiarBtnTo(prod)">
                  <v-icon color="#9d9c9c"> mdi-grease-pencil </v-icon>
                </v-btn>
                <v-divider class="mt-5" vertical inset></v-divider>
                <v-btn class="mb-5 ml-3" @click="borrarCard(prod)" text icon>
                  <v-icon color="red"> mdi-delete </v-icon>
                </v-btn>
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
                <v-btn class="mb-5 mr-5" icon @click="cambiarBtnTo(prod)">
                  <v-icon color="#9d9c9c"> mdi-barcode </v-icon>
                </v-btn>
                <v-btn class="mb-5 mr-5" icon @click="cambiarBtnTo(prod)">
                  <v-icon color="#9d9c9c"> mdi-file-image </v-icon>
                </v-btn>
                <v-btn class="mb-5 mr-5" icon @click="cambiarBtnTo(prod)">
                  <v-icon color="#9d9c9c"> mdi-grease-pencil </v-icon>
                </v-btn>
                <v-divider class="mt-5" vertical inset></v-divider>
                <v-btn class="mb-5 ml-3" @click="borrarCard(prod)" text icon>
                  <v-icon color="red"> mdi-delete </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
    <v-dialog v-model="dialogEdit" persistent>
      <form class="v-dialog" v-if="idEdit == true">
        <div class="d-flex flex-row justify-end">
          <v-btn icon text @click="closeAll()">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </div>
        <v-text-field v-model="idEditado" filled label="Editar ID">
        </v-text-field>
        <v-btn width="200px" @click="editarID()"> Guardar Cambios </v-btn>
      </form>
      <form class="v-dialog" v-else>
        <div class="d-flex flex-row justify-end">
          <v-btn icon text @click="closeAll()">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </div>
        <v-text-field v-model="stockEditado" filled label="Editar Cantidad">
        </v-text-field>
        <v-btn width="200px" @click="editarStock()"> Guardar Cambios </v-btn>
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
    idEdit : false
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
      this.dialogEdit = false
      this.idEdit = false

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
      this.idEditado = "";
      this.idEdit = false;
      this.dialogEdit = false;
},
    editarStockDulces() {
      const cardRef = doc(db, "AdminStock/Dulces");
      updateDoc(cardRef, {
        cards: arrayRemove({
          title: this.prodTitle,
          src: this.prodSrc,
          id: this.prodId,
          cantidad: this.prodCantidad,
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
          precio: this.prodPrecio,
          value: this.prodValue,
        }),
      });
      this.stockEditado = "";
      this.dialogEdit = false;
    },
    editarStockPanificados() {
      const cardRef = doc(db, "AdminStock/Panificados");
      updateDoc(cardRef, {
        cards: arrayRemove({
          title: this.prodTitle,
          src: this.prodSrc,
          id: this.prodId,
          cantidad: this.prodCantidad,
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
          precio: this.prodPrecio,
          value: this.prodValue,
        }),
      });
      this.stockEditado = "";
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
      const cardRef = doc(db, "AdminStock/v-card1");
      updateDoc(cardRef, {
        cards: arrayRemove({
          title: prod.title,
          src: prod.src,
          id: prod.id,
          cantidad: prod.cantidad,
          precio: prod.precio,
          value: prod.value,
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
  margin-top: 100px;
}
.v-dialog {
  background-color: white;
  margin: 0;
  padding: 25px;
  display: flex;
  flex-direction: column;

  .v-btn-guardar {
    display: flex;
    justify-self: center;
  }
}
.container-img-btn {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: end;
  align-items: flex-end;
}
.div-files-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  .input-file {
    width: 250px;
  }
  .input-btn-file {
    width: 250px;
  }
}
.alerta {
  margin-right: 150px;
  margin-top: 100px;
}
.subTitle{
  color: rgb(102,103,104)
}
</style>
