<template>
  <div>
    <navBarAdmin />
    <v-container class="container">
      <h3>AGREGAR</h3>
      <v-progress-linear
        background-color="#b3b6bc"
        color="#f2c04a"
        :value="changeValue()"
        class="mb-10"
      >
      </v-progress-linear>
      <v-select
        v-model="selectedCategory"
        :items="items"
        item-text="categoryName"
        return-object
        label="Categoria"
      ></v-select>
      <v-select
        v-if="selectedCategoryName == 'Salados'"
        v-model="selectedSubCategory"
        :items="itemSub"
        item-text="subCategoryName"
        label="Categoria"
      ></v-select>
      <v-text-field v-model="title1" filled label="Agrega un Titulo" clearable>
      </v-text-field>
      <v-text-field
        v-model="stock"
        filled
        label="Cantidades del producto"
      ></v-text-field>

      <v-text-field
        v-model="id"
        filled
        label="Identifica con un ID"
        clearable
      ></v-text-field>
      <v-text-field
        v-model="precio"
        filled
        label="Precio"
        clearable
      ></v-text-field>
    </v-container>
    <v-divider></v-divider>
    <v-container>
      <v-row>
        <v-col v-for="imagen in imagenes" :key="imagen.imagen" cols="2">
          <v-img :src="imagen.imagen" height="250px">
            <div class="container-img-btn">
              <v-btn @click="eliminarImg(imagen)" icon>
                <v-icon color="white"> mdi-delete </v-icon>
              </v-btn>
              <v-btn @click="seleccionarImg(imagen)" icon>
                <v-icon color="white"> mdi-check </v-icon>
              </v-btn>
            </div>
          </v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <div class="div-files-selection">
        <input
          v-if="UploadValue == 0"
          type="file"
          @change="onFileSelected"
          class="input-file"
        />
      </div>
      <div class="d-flex flex-row justify-space-between">
        <v-hover v-slot="{ hover }">
          <v-btn @click="onUpload" class=" ml-15"
            color="#b3b6bc"
            width="200" 
            height="40"
            :style="{ 'background-color': hover ? '#febf2c' : '#b3b6bc'}"
          >
            <p class="mt-4">
              Subir imagen
            </p>
            <v-icon color="white">
              mdi-upload
            </v-icon>
          </v-btn>
        </v-hover>
        <v-btn @click="updateCard" class="mr-15 mt-10" color="#febf2c" width="150" height="40">
          <p class="p-agregar mt-4">
            Agregar
          </p>
        </v-btn>
      </div>
    </v-container>
    <v-divider></v-divider>
    <v-dialog v-model="dialogEdit">
      <form class="v-dialog">
        <v-text-field v-model="stockEditado" filled label="Editar Cantidad">
        </v-text-field>
        <v-btn width="200px" @click="editarStock()"> Guardar Cambios </v-btn>
      </form>
    </v-dialog>
    <!----------------------------------Snackbars----------------------------->
    <v-snackbar
    v-model="hidden"
    color="green"
    timeout="1200"
    transition="scroll-x-transition"
    >
    <div class="d-flex flex-row justify-space-between">
      <p class="mt-2 ml-5" style=" font-size: 20px;">
      Imagen Seleccionada!
    </p>
    <v-btn icon text @click="hidden = false">
      <v-icon>
        mdi-close
      </v-icon>
    </v-btn>
    </div>
    </v-snackbar>
    <v-snackbar
    v-model="upload"
    color="green"
    timeout="1200"
    transition="scroll-x-transition"
    >
      <div class="d-flex flex-row justify-space-between">
        <p class="p-img-upload mt-4">Imagen Subida!</p>
          <v-icon  class="input-btn-file" color="white">
          mdi-check</v-icon
        >
      </div>
    </v-snackbar>
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
  listAll,
  getDownloadURL,
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
  name: "AdminView",
  components: {
    navBarAdmin,
  },
  data: () => ({
    selectedCategory: null,
    selectedCategoryName: "",
    selectedSubCategory: null,
    items: [
      { categoryName: "Salados" },
      { categoryName: "Panificados" },
      { categoryName: "Dulce" },
    ],
    itemSub: [{ subCategoryName: "Simples" }, { subCategoryName: "Rellenos" }],
    title1: "",
    src1: "",
    id: "",
    precio: "",
    hidden: false,
    productos: null,
    UploadValue: 0,
    imagenes: [],
    selectedFile: null,
    stockEditado: "",
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
    disabled: true,
    upload: false,
    idRoute: '',
  }),
  watch: {
    UploadValue(){
      if(this.UploadValue == 100){
        this.upload = true
      }else{
        this.upload = false
      }
    },
    selectedCategory() {
      this.selectedCategoryName = this.selectedCategory.categoryName;
      console.log("Label: ", this.selectedCategoryName);
      if(this.selectedCategoryName == 'Dulce'){
        this.idRoute = 'DC'
      } else if(this.selectedCategoryName == 'Panificados'){
        this.idRoute = 'PN'
      }
    },
    selectedSubCategory() {
      console.log(
        "Label: ",
        this.selectedCategoryName + this.selectedSubCategory
      );
      if(this.selectedCategoryName + this.selectedSubCategory == 'SaladosSimples'){
        this.idRoute = 'SS'
      } else if(this.selectedCategoryName + this.selectedSubCategory == 'SaladosRellenos'){
        this.idRoute = 'SR'
      } 
    },
  },

  methods: {
    changeValue() {
      if (window.innerWidth >= 1400) {
        return 10;
      } else {
        return 13;
      }
    },

    updateCard() {
      if (this.selectedCategoryName == "Salados") {
        const cardRef = doc(
          db,
          `AdminStock/${
            this.selectedCategory.categoryName + this.selectedSubCategory
          }`
        );
        updateDoc(cardRef, {
          cards: arrayUnion({
            title: this.title1,
            src: this.src1,
            id: this.id,
            cantidad: this.stock,
            precio: this.precio,
            idRoute: this.idRoute,
            value: 1,
          }),
        });

        (this.title1 = ""),
          (this.src1 = ""),
          (this.id = ""),
          (this.stock = ""),
          (this.precio = ""),
          setTimeout(this.actualizarPagina, 1500);
      } else {
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
            idRoute: this.idRoute,
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
      }
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
    onSnapshot(doc(db, "AdminStock/v-card1"), (doc) => {
      this.productos = doc.data().cards;
    });
    const listRef = ref(storage, "AdminStock/");
    listAll(listRef).then((res) => {
      // eslint-disable-next-line no-unused-vars
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        let downloadUrl = getDownloadURL(ref(storage, itemRef));
        downloadUrl.then((url) => {
          const imgUrls = {
            imagen: url,
            ruta: itemRef.fullPath,
          };
          this.imagenes.push(imgUrls);
        });
      });
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
p {
  font-family: humanst521-1;
  font-size: 13px;
  color: #fff
}
.p-agregar{
  font-family: humanst521-1;
  font-size: 13px;
  font-weight: bolder;
  color: #fff
}
.p-img-upload{
  margin-left: 32%;
  font-family: humanst521-1;
  font-size: 18px;
  color: #fff
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
  margin-top:122%;
  width: 100%;
  height: 15%;
  background-color: rgba(0,0,0, 0.5);
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
</style>
