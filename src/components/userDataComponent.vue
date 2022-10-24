<template>
    <div>
    <h3 class="ml-3">DATOS PERSONALES</h3>
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
                <v-btn  elevation="0" v-if="edit" @click="editarInfo" color="#febf2c">
                    <p class="p-v-btn mt-4"  >EDITAR</p> 
                    <v-icon class="ml-3">
                        mdi-pencil
                    </v-icon>
                </v-btn>
                <v-btn v-else @click="editarInfoTrue" elevation="0" color="#febf2c">
                    <p class="p-v-btn mt-4" >EDITAR</p> 
                    <v-icon class="ml-3">
                        mdi-pencil
                    </v-icon>
                </v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn @click="guardarCambios" class=" mt-15 linear-cont" elevation="0" color="#febf2c">
                    <p class="p-v-btn mt-4" >GUARDAR CAMBIOS</p> 
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
            editarInfoTrue(){
                this.edit = true
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

@font-face{
font-family: humanst521-1;
src: url('/src/assets/Humanst521LtBTLight.ttf');
};
@font-face{
font-family:humanst521-2;
src: url('/src/assets/Humanst521BTBold.ttf');
};
@font-face{
font-family: humans521-3;
src: url('/src/assets/Hum521Rm.ttf');
}
@font-face {
font-family: 'humanst521_btroman';
src: url('/src/assets/hum521rm-webfont.woff2') format('woff2'),
     url('/src/assets/hum521rm-webfont.woff') format('woff');


}
@font-face {
font-family: 'humanst521_btbold';
src: url('/src/assets/humanst521_bt_bold-webfont.woff2') format('woff2'),
     url('/src/assets/humanst521_bt_bold-webfont.woff') format('woff');
font-weight: normal;
font-style: normal;

}


h3{
    font-family: humanst521-1;
    font-size: 20px;
    color: grey
}
.linear-cont{
width: 70%;
margin-left: 30%;

}
.p-v-btn{
    font-family: 'humanst521_btbold';
    color: #fff
}

.v-btn {
  text-transform:none !important;
}
.alerta{
        margin-right: 150px;
        margin-bottom: 1000px
    }

</style>