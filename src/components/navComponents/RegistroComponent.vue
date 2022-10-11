<template>
  <div class="v-dialog">
      <h1 class="d-flex justify-center mb-5">Registro de usuarios</h1>
      <form @submit.prevent="crearUsuario({email:email, password:pass1})" class="v-form">
          <v-text-field
              type="email" 
              placeholder="Ingrese email"
              v-model="email"
              
          ></v-text-field>
          <v-text-field
              type="password" 
              placeholder="Ingrese contraseña"
              v-model="pass1"
          ></v-text-field>
          <v-text-field
              type="password" 
              placeholder="Repita contraseña"
              v-model="pass2"
          ></v-text-field>

          <v-btn type="submit" :disabled='!desactivar'>Registrar</v-btn>
      </form>
  </div>

</template>

<script>
import {mapActions, mapState} from 'vuex'
  export default {
      name: "RegistroComponent",
      data(){
          return{
              email: '',
              pass1: '',
              pass2: '',
              
          }
      },
      created(){
  
      },
      methods:{
          ...mapActions(['crearUsuario'])

          
      },
      computed:{
          ...mapState(['error']),
          desactivar(){
            return this.pass1 === this.pass2 && this.pass1.trim() !== ''
        }
      }
  }
</script>

<style lang="scss" scoped>

.v-dialog{
        background-color: #fff;
        width: 100%;
        height: 50%;
        margin: 0;
        padding: 15px;
        display: flex;
        flex-direction: column;

        .v-form{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
        }
    }

</style>