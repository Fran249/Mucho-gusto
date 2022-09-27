<template>
    <div>
        <navBar/>
        <h3 class=" mt-10 d-flex justify-center">USER VIEW</h3>
        <v-container class="">
            
            <v-row row>
                <v-col cols="6" class="d-flex justify-center">
                    <v-btn @click="cambiarNombre" >Cambiar Nombre</v-btn>
                </v-col>
                <v-col cols="6" class="d-flex justify-center">
                    <v-btn>Cambiar Foto</v-btn>
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

const auth = getAuth();
initializeApp(firebaseConfig);



    export default{
        name: 'UserView',
        components:{
            navBar,
        },
        data:()=>({
            nombre:'',
        }),
        methods: { 

            cambiarNombre(){
                updateProfile(auth.currentUser, {
                    displayName: this.nombre, photoURL: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                }).then(() => {
                    // Profile updated!
                    location.reload()
                    // ...
                })
                },


        },
        computed: { 
            ...mapState(['usuario']),
        },
    }
</script>