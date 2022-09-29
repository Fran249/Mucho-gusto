<template>
        <v-container fluid class="">
            
            <v-row row no-gutters>
                <v-col cols="6">
                    <v-col cols="12" class="fotoContainer__1" >

                            <v-text-field v-model="nombre" filled label="Filled" clearable></v-text-field> 
                            <v-btn @click="cambiarNombre" >Cambiar Nombre</v-btn>
                    </v-col>
                <v-col cols="12" class="fotoContainer__2">
                    
                        <v-progress-linear :value="UploadValue" max="100"></v-progress-linear>
                        <input type="file" @change="onFileSelected">
                        <v-btn @click="onUpload" v-if="this.UploadValue == 0">Subir</v-btn>
                        <v-btn @click="cambiarFoto" v-if="this.UploadValue == 100">Cambiar Foto</v-btn>                  

                </v-col>
                </v-col>

            </v-row>
        </v-container>
</template>

<script>
import {  mapState } from 'vuex'
import { getAuth, updateProfile } from "firebase/auth"
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
            //////////////////////------Funcion para cambiar nombre-----//////////////////////                     
            cambiarNombre(){
                updateProfile(auth.currentUser, {
                    displayName: this.nombre
                    }).then(() => {
                        location.reload()
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
            computed: { 
            ...mapState(['usuario']),
            },
    }
</script>


<style lang="scss" scoped>

</style>