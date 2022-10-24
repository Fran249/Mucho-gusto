<template>
  <div class="mt-5 v-container">
    <h3 class="mb-5">FOTO DE PERFIL</h3>
    <v-img :src="img" width="250" height="250"> </v-img>
    <div class="linear-cont">
      <v-progress-linear
       class="mt-5 progress-linear"
        background-color="#b3b6bc"
        color="#f2c04a"
        :value="UploadValue"
        max="100"
      >
      </v-progress-linear>
    </div>
    <input class="mt-5" type="file" @change="onFileSelected" />
    <v-btn
      @click="onUpload"
      v-if="this.UploadValue == 0"
      :disabled="disabled"
      color="#febf2c"
      class="mt-5 linear-cont"
    >
      <p class="p-v-btn mt-4">SUBIR IMAGEN</p>
      <v-icon right dark class="ml-2 mb-1" color="#fff">
        mdi-cloud-upload
      </v-icon>
    </v-btn>

    <v-divider class="mt-5"></v-divider>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getAuth, updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/index";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();
const auth = getAuth();
initializeApp(firebaseConfig);

export default {
  name: "updatePerfilComponent",

  data: () => ({
    nombre: "",
    disabledBtn: false,
    selectedFile: null,
    UploadValue: 0,
    picture: "",
    img: auth.currentUser.photoURL,
  }),
  methods: {
    //Seleccion de Archivo
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    //////////////////////------Subir Archivo a Storage-----//////////////////////
    onUpload() {
      const storageRef = ref(
        storage,
        `/users/${auth.currentUser.uid}/${this.selectedFile.name}`
      );
      // eslint-disable-next-line no-unused-vars
      uploadBytesResumable(storageRef, this.selectedFile).then((snapshot) => {
        //////////////////////------Barra de progreso-----//////////////////////
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.UploadValue = progress;
        console.log(this.UploadValue);
      });
      setTimeout(this.cambiarFoto, 1200);
      this.loader = "loading3";
    },
    //////////////////////------Funcion para cambiar Foto-----//////////////////////
    cambiarFoto() {
      getDownloadURL(
        ref(storage, `/users/${auth.currentUser.uid}/${this.selectedFile.name}`)
      )
        .then((url) => {
          this.picture = url;
          console.log(this.picture);
        })
        .catch((error) => {
          console.log(error);
        });

      //////////////////////------timeOut para Esperar la carga completa del archivo -----//////////////////////

      setTimeout(this.changePic, 2000);
    },
    changePic() {
      updateProfile(auth.currentUser, {
        photoURL: this.picture,
      }).then(() => {
        // Profile updated!

        // ...
        location.reload();
      });
    },
  },
  watch: {},

  computed: {
    ...mapState(["usuario"]),

    disabled: {
      get() {
        if (this.selectedFile != null) {
          return false;
        } else {
          return true;
        }
      },
    },
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

.linear-cont {
  width: 250px;
}

h3 {
  font-family: humanst521-1;
  font-size: 20px;
  color: grey;
}
.p-v-btn {
  font-family: "humanst521_btbold";
  color: #fff;
}

.v-btn {
  text-transform: none !important;
}
p {
  font-family: "humanst521_btbold";
  font-size: 14px;
}

.progress-linear{
    width: 250px;
}
.v-container{
    display: flex;
    flex-direction: column;
}
</style>
