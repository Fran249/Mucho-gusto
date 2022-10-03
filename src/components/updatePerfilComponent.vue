<template>
        <v-container fluid >
            
            <v-row row no-gutters>
                <v-col cols="6">
                    <v-col cols="12" class="fotoContainer__2">
                            <h3>Cambiar Foto de Perfil</h3>
                            <v-progress-linear :value="UploadValue" max="100"></v-progress-linear>
                            <input type="file" @change="onFileSelected">
                            <v-btn @click="onUpload" v-if="this.UploadValue == 0">Subir</v-btn>
                            
                            <v-btn
                            v-if="this.UploadValue == 100"
                                :loading="loading3"
                                :disabled="loading3"
                                @click="cambiarFoto"
                                >
                                Cambiar Foto
                                <v-icon
                                    right
                                    dark
                                    class="ml-2"
                                >
                                    mdi-cloud-upload
                                </v-icon>
                                </v-btn>                

                    </v-col>
                    <v-divider ></v-divider>
                </v-col>

            </v-row>
        </v-container>
</template>

<script>
import {  mapState } from 'vuex'
import { getAuth, updateProfile} from "firebase/auth"
import { initializeApp } from 'firebase/app';
import { firebaseConfig} from '../firebase/index'
import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";

const storage = getStorage();
const auth = getAuth();
initializeApp(firebaseConfig);

    export default {

        name:'updatePerfilComponent',

        data:()=>({
            nombre:'',
            selectedFile: null,
            UploadValue: 0,
            picture: '',
            loader: null,
            loading3: false,
        }),
        methods: {
            
            //Seleccion de Archivo
            onFileSelected(event){
                this.selectedFile = event.target.files[0];
            },
            //////////////////////------Subir Archivo a Storage-----////////////////////// 
            onUpload(){
                const storageRef = ref(storage , `/users/${auth.currentUser.uid}/${this.selectedFile.name}`);
                // eslint-disable-next-line no-unused-vars
                uploadBytesResumable(storageRef, this.selectedFile).then((snapshot) => {
                    
            //////////////////////------Barra de progreso-----////////////////////// 
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.UploadValue = progress;
                    console.log(this.UploadValue)
                })
                
            },
            //////////////////////------Funcion para cambiar Foto-----////////////////////// 
            cambiarFoto(){
                getDownloadURL(ref(storage, `/users/${auth.currentUser.uid}/${this.selectedFile.name}`))
                .then((url) => {
                    this.picture = url
                    console.log(this.picture)
                })
                .catch((error) => {
                    console.log(error)
                });
                this.loader = 'loading3'
            //////////////////////------timeOut para Esperar la carga completa del archivo -----//////////////////////
                
                setTimeout(this.changePic, 2300 )

            },
            changePic(){
                updateProfile(auth.currentUser, {
                photoURL: this.picture
                }).then(() => {
                // Profile updated!
                
                // ...
                location.reload()
                })

            }


            },
            watch: {
                loader () {
                    const l = this.loader
                    this[l] = !this[l]

                    setTimeout(() => (this[l] = false), 2300)

                    this.loader = null
                }
            },

            computed: { 
            ...mapState(['usuario']),
            },
    }
</script>


<style lang="scss" scoped>
.fotoContainer__1{
    width: 500px;
    display: flex;
    flex-direction: column;
    
}
.fotoContainer__2{

    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 20px;

}
</style>