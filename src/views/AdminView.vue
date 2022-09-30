<template>
    <div>
        <navBar/>
        <v-container>

        <v-text-field
            v-model="title1"
            filled
            label="Agrega un Titulo"
            clearable
          >
        </v-text-field>
        <v-text-field
            v-model="src1"
            filled
            disabled
            
          ></v-text-field>


          <v-text-field
            v-model="id"
            filled
            label="Identifica con un ID"
            clearable
          ></v-text-field>
          <v-btn @click="updateCard">
            Agregar
        </v-btn>
        </v-container>
        <v-divider></v-divider>
        <v-container fluid>
            
            <div class="div-files-selection">
                <v-icon v-if="UploadValue == 100"  class="input-btn-file" color="green"> mdi-check</v-icon>
                <input v-if="UploadValue == 0" type="file" @change="onFileSelected" class="input-file">
                <v-btn v-if="UploadValue == 0" @click="onUpload" class="input-btn-file">Subir imagen</v-btn>
            </div>
        </v-container>
        <v-fab-transition>
              <v-btn
                v-show="hidden"
                fixed
                right
                fab
                text
                height="1px"
                width="1px"
                class="alerta"
              >
              <v-alert
                shaped
                type="success"
                >
                Imagen Seleccionada
                </v-alert>
              </v-btn>
            </v-fab-transition>
        <v-container>
            <v-row>
                <v-col v-for="imagen in imagenes" :key="imagen.imagen" cols="2" >
                    <v-img :src="imagen.imagen" height="250px">
                        <div class="container-img-btn">
                            <v-btn @click="eliminarImg(imagen)" icon>
                                <v-icon color="red">
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                            <v-btn @click="seleccionarImg(imagen)" icon>
                                <v-icon color="green">
                                    mdi-check
                                </v-icon>
                            </v-btn>
                        </div>
                    </v-img>
                </v-col>
            </v-row>
            </v-container>
            <v-divider></v-divider>
        <v-container>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">
                       Nombre
                    </th>
                    <th class="text-left">
                        Src
                    </th>
                    <th class="text-left">
                        ID
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="prod in productos"
                    :key="prod.title"
                    
                    >
                    <td >{{ prod.title }} </td>
                    <td>{{ prod.src }} </td>
                    <td>{{ prod.id }} </td>
                    <v-btn @click="borrarCard(prod)">Borrar articulo</v-btn>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </v-container>

    </div>
</template>


<script>
    import { getFirestore, doc, updateDoc, arrayUnion ,arrayRemove, onSnapshot} from "firebase/firestore";
    import { getStorage, ref, listAll , getDownloadURL ,deleteObject, uploadBytesResumable } from "firebase/storage";
    //import { getAuth } from "firebase/auth"
    import { initializeApp } from 'firebase/app';
    import { firebaseConfig} from '../firebase/index'
    import navBar from "@/components/navBar.vue";

    //const auth = getAuth();
    const storage = getStorage();
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);



    export default{
        name: 'AdminView',
        components:{
            navBar,
        },
        data:()=>({
            title1: '',
            src1: '',
            id: '',
            hidden: false,
            productos: null,
            UploadValue: 0,
            imagenes:[],
            selectedFile: null,
            
        }),

        methods:{
           

            updateCard(){
                const cardRef = doc(db, "AdminStock/v-card1");
                updateDoc(cardRef, {
                cards: arrayUnion({title: this.title1,src: this.src1, id: this.id}),
                
            });
                
                this.title1 = '',
                this.src1 = '',
                this.id = ''
                
            },
            borrarCard(prod){

                const cardRef = doc(db, "AdminStock/v-card1");
                updateDoc(cardRef, {
                cards: arrayRemove({ title: prod.title, src: prod.src, id: prod.id })
            });
              
            },
            onFileSelected(event){
                this.selectedFile = event.target.files[0];
            },
            onUpload(){
                const storageRef = ref(storage , `/AdminStock/${this.selectedFile.name}`);
                // eslint-disable-next-line no-unused-vars
                uploadBytesResumable(storageRef, this.selectedFile).then((snapshot) => {
                    
            //////////////////////------Barra de progreso-----////////////////////// 
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.UploadValue = progress;
                    
                    setTimeout(this.actualizarPagina, 1500)
                })
            
            },
            actualizarPagina(){
                location.reload()
            },
            seleccionarImg(imagen){
                console.log(imagen.imagen)
                this.src1 = imagen.imagen
                this.hidden = true
                setTimeout(this.quitarAlerta, 1500)
            },
            quitarAlerta(){
                this.hidden = false
            },
            eliminarImg(imagen){
                if (confirm('Seguro que quieres eliminar esta imagen?')){
                    const imgRef = ref(storage, `${imagen.ruta}`);

                    // Delete the file
                    deleteObject(imgRef).then(() => {
                    // File deleted successfully
                    location.reload()
                    }).catch((error) => {
                    // Uh-oh, an error occurred!
                    console.log(error)
                    });
                }
            },

        },
        mounted(){
            onSnapshot(doc(db, "AdminStock/v-card1"), (doc) => {
                
                

                this.productos = doc.data().cards;


            });
            const listRef = ref(storage, 'AdminStock/');
            listAll(listRef).then((res) => {

                    // eslint-disable-next-line no-unused-vars
                    res.items.forEach((itemRef) => {
                    // All the items under listRef.
                 let  downloadUrl = getDownloadURL(ref(storage, itemRef))
                       downloadUrl.then((url)=>{
                        const imgUrls = {
                            'imagen': url,
                            'ruta' : itemRef.fullPath
                        }
                        this.imagenes.push(imgUrls)
                       })
                    });
                });

        },
    }
</script>


<style lang="scss" scoped>

    .container-img-btn{
        width: 100%;
        height: 100%;
        
        display: flex;
        justify-content: end;
        align-items: flex-end;
    }
    .div-files-selection{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        .input-file{
            width: 250px;
        }
        .input-btn-file{
            width: 250px;
        }

    }
    .alerta{
        margin-right: 150px;
    }


</style>