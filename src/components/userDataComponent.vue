<template>
    <div>
    <v-container>
        <v-row>
            <v-col cols="6">
                <h3>Nombre Completo</h3>
                <v-btn @click="editarNombre" icon>
                    <v-icon color="green">
                        mdi-account-edit
                    </v-icon>
                </v-btn>
                <v-text-field
                filled
                :disabled="editNombre"
                v-model="nombreCompleto"
                :value="nombreCompleto"
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <h3>Direccion</h3>
                <v-btn @click="editarDireccion" icon>
                    <v-icon color="green">
                        mdi-account-edit
                    </v-icon>
                </v-btn>
                <v-text-field
                filled
                :disabled="editDireccion"
                v-model="direccion"
                :value="direccion"
                >
                </v-text-field>
            </v-col>
            <v-col cols="6">
                <h3>DNI</h3>
                <v-btn @click="editarDNI" icon>
                    <v-icon color="green">
                        mdi-account-edit
                    </v-icon>
                </v-btn>
                <v-text-field
                filled
                :disabled="editDNI"
                v-model="documentodni"
                :value="documentodni"
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <h3>Telefono de Contacto</h3>
                <v-btn @click="editarTelefono" icon>
                    <v-icon color="green">
                        mdi-account-edit
                    </v-icon>
                </v-btn>
                <v-text-field
                filled
                :disabled="editTelefono"
                v-model="telefonoContacto"
                :value="telefonoContacto"
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-btn @click="guardarCambios">
                    Guardar Cambios
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
            editNombre: true,
            editDNI: true,
            editDireccion: true,
            editTelefono: true,
            hidden: false,
        }),
        methods:{
            editarNombre(){
                this.editNombre = false
            },
            editarDNI(){
                this.editDNI = false
            },
            editarDireccion(){
                this.editDireccion = false
            },
            editarTelefono(){
                this.editTelefono = false
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