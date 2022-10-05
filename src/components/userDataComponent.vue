<template>
    <div>
    <v-container>
        <v-row>
            <v-col cols="6">
                <h3>Nombre Completo</h3>
                <v-text-field
                filled
                :disabled="edit"
                v-model="nombreCompleto"
                :value="nombreCompleto"
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <h3>Direccion</h3>
                <v-text-field
                filled
                :disabled="edit"
                v-model="direccion"
                :value="direccion"
                >
                </v-text-field>
            </v-col>
            <v-col cols="6">
                <h3>DNI</h3>
                <v-text-field
                filled
                :disabled="edit"
                v-model="documentodni"
                :value="documentodni"
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <h3>Telefono de Contacto</h3>
                <v-text-field
                filled
                :disabled="edit"
                v-model="telefonoContacto"
                :value="telefonoContacto"
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-btn @click="guardarCambios">
                    Guardar Cambios
                </v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn @click="editarInfo">
                    Editar 
                    <v-icon class="ml-3">
                        mdi-pencil
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
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
                Cambios Guardados!
                </v-alert>
              </v-btn>
        </v-fab-transition>
    </div>
</template>


<script>
        import {  mapState } from 'vuex'
        import { getFirestore, onSnapshot, doc, updateDoc } from "firebase/firestore";
        import { initializeApp } from 'firebase/app';
        import { updateProfile } from "firebase/auth"
        import { auth, firebaseConfig} from '../firebase/index'
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

    export default{
        name: 'userDataComponent',

        data: ()=>({
            nombreCompleto :'',
            direccion: '',
            documentodni: '',
            telefonoContacto:'',
            edit: true,
            hidden: false,
        }),
        methods:{
            editarInfo(){
                this.edit = false
            },
            guardarCambios(){
                const dataRef = doc(db, `/Usuarios/${auth.currentUser.uid}/`);
                updateDoc(dataRef,{nombreCompleto : this.nombreCompleto, direccion: this.direccion,
                        telefonoContacto: this.telefonoContacto, dni: this.documentodni});
                updateProfile(auth.currentUser, {
                    displayName: this.nombreCompleto
                    })
                        this.editNombre = true
                        this.editDNI = true
                        this.editDireccion = true
                        this.editTelefono =  true
                        this.hidden = true
                setTimeout(this.quitarAlerta, 1500)

            },
            quitarAlerta(){
                
                location.reload()
            },



        },
        computed:{
            ...mapState(['usuario']),
        },
        mounted(){
            onSnapshot(doc(db, `/Usuarios/${auth.currentUser.uid}/`), (doc) => {
                
                

                
                this.nombreCompleto = doc.data().nombreCompleto;
                this.direccion = doc.data().direccion;
                this.documentodni = doc.data().dni;
                this.telefonoContacto = doc.data().telefonoContacto

            });
        },

    }



</script>


<style lang="scss" scoped>

.alerta{
        margin-right: 150px;
        margin-bottom: 1000px
    }

</style>