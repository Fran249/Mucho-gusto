<template>
    <div>
        <navBar/>
        <h3 class=" mt-10 d-flex justify-center">{{usuario.nombre}}</h3>
        <v-container class="">
            
            <v-row row>

                <v-col cols="6" class="d-flex justify-center">
                    <input type="text" v-model="nombre">
                    <v-btn @click="cambiarNombre" >Cambiar Nombre</v-btn>
                </v-col>
                <v-col cols="6" class="d-flex justify-center">
                    <div class="fotoContainer">
                    <v-progress-linear :value="UploadValue" max="100"></v-progress-linear>
                    <input type="file" @change="onFileSelected">
                    <v-btn @click="onUpload" v-if="this.UploadValue == 0">Subir</v-btn>
                    <v-btn @click="cambiarFoto" v-if="this.UploadValue == 100">Cambiar Foto</v-btn>                  
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>


<script>
import {  mapState } from 'vuex'
import { getAuth, updateProfile } from "firebase/auth"
import { initializeApp } from 'firebase/app';
import { firebaseConfig} from '../firebase/index'
import navBar from '../components/navBar.vue'
import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";

const storage = getStorage();
const auth = getAuth();
initializeApp(firebaseConfig);



    export default{
        name: 'UserView',
        components:{
            navBar,
        },
        data:()=>({
            nombre:'',
            selectedFile: null,
            UploadValue: 0,
            picture: '',

            
        }),
        methods: { 

            cambiarNombre(){
                updateProfile(auth.currentUser, {
                    displayName: this.nombre
                }).then(() => {
                    // Profile updated!
                    location.reload()
                    // ...
                })
                },
                onFileSelected(event){
                    this.selectedFile = event.target.files[0];
                },
                onUpload(){
                    const storageRef = ref(storage , `/${auth.currentUser.uid}/${this.selectedFile.name}`);
                    
                    
                  // eslint-disable-next-line no-unused-vars
               uploadBytesResumable(storageRef, this.selectedFile).then((snapshot) => {
                        //const gsReference = ref(storage, `gs://bucket/${auth.currentUser.uid}/${this.selectedFile.name}`);
                            
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                this.UploadValue = progress;
                            
                            console.log('Uploaded a blob or file!');
                            console.log(this.UploadValue)
                            })
                          
                        },                        
                        cambiarFoto(){
                            getDownloadURL(ref(storage, `${auth.currentUser.uid}/${this.selectedFile.name}`))
                            .then((url) => {
                                // `url` is the download URL for 'images/stars.jpg'

                                this.picture = url
                                console.log(this.picture)
                            })
                            // eslint-disable-next-line no-unused-vars
                            .catch((error) => {
                                // Handle any errors
                            });    
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

.fotoContainer{
    width: 500px;
    display: flex;
    flex-direction: column;
}


</style>