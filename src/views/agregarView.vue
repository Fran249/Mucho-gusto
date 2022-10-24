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
      <v-btn @click="updateCard"> Agregar </v-btn>
    </v-container>
    <v-divider></v-divider>
    <v-container fluid>
      <div class="div-files-selection">
        <v-icon v-if="UploadValue == 100" class="input-btn-file" color="green">
          mdi-check</v-icon
        >
        <input
          v-if="UploadValue == 0"
          type="file"
          @change="onFileSelected"
          class="input-file"
        />
        <v-btn v-if="UploadValue == 0" @click="onUpload" class="input-btn-file"
          >Subir imagen</v-btn
        >
      </div>
    </v-container>
    <v-fab-transition>
      <v-btn
        v-show="hidden"
        fixed
        right
        top
        fab
        text
        height="1px"
        width="1px"
        class="alerta"
      >
        <v-alert shaped type="success"> Imagen Seleccionada </v-alert>
      </v-btn>
    </v-fab-transition>
    <v-container>
      <v-row>
        <v-col v-for="imagen in imagenes" :key="imagen.imagen" cols="2">
          <v-img :src="imagen.imagen" height="250px">
            <div class="container-img-btn">
              <v-btn @click="eliminarImg(imagen)" icon>
                <v-icon color="red"> mdi-delete </v-icon>
              </v-btn>
              <v-btn @click="seleccionarImg(imagen)" icon>
                <v-icon color="green"> mdi-check </v-icon>
              </v-btn>
            </div>
          </v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-dialog v-model="dialogEdit">
      <form class="v-dialog">
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
  }),
  watch: {
    selectedCategory() {
      this.selectedCategoryName = this.selectedCategory.categoryName;

      console.log("Label: ", this.selectedCategoryName);
    },
    selectedSubCategory() {
      console.log(
        "Label: ",
        this.selectedCategoryName + this.selectedSubCategory
      );
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
    cambiarBtnTo(prod) {
      this.dialogEdit = true;
      this.prodTitle = prod.title;
      this.prodSrc = prod.src;
      this.prodId = prod.id;
      this.prodCantidad = prod.cantidad;
      this.prodPrecio = prod.precio;
      this.prodValue = prod.value;
    },
    editarStock() {
      const cardRef = doc(db, "AdminStock/v-card1");
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
</style>
