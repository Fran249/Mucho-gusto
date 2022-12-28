<template>
  <div class="v-dialog">
      <h1 class="mb-5">¡CREÁ TU CUENTA!</h1>
      <form @submit.prevent="crearUsuario({email:email, password:pass1})" class="v-form">
          <v-text-field
              type="email" 
              v-model="email"
              filled
              full-width
              append-icon="mdi-email"
              placeholder="E-mail"
          ></v-text-field>
          <v-text-field
              v-model="pass1"
              filled
              full-width
              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (value = !value)"
              :type="value ? 'password' : 'text'"
              placeholder="Contraseña"
          ></v-text-field>
          <v-text-field
              v-model="pass2"
              filled
              full-width
              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (value = !value)"
              :type="value ? 'password' : 'text'"
              placeholder="Confirmar contraseña"
          ></v-text-field>

          <v-btn 
          width="75%" 
          class="ml-13 btn-reg" 
          color="#febf2c"
          type="submit"
          :disabled='!desactivar'>
          <p class="mt-4 p-v-btn"  >
            FINALIZAR REGISTRO
          </p>
          </v-btn>
      </form>
  </div>

</template>

<script>
import {mapActions, mapState} from 'vuex'
  export default {
      name: "RegistroComponent",
      data(){
          return{
              value: String,
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


.p-v-btn{
    font-family: 'humanst521-1';
    color: #fff
}
h1{
    font-family: 'humanst521-1';
    font-size: 20px;
    font-weight: bold;
    color: #374763;
}
.v-dialog{
        background-color: #fff;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 50px;
        display: flex;
        flex-direction: column;

        .v-form{
            gap: 15px;
        }
    }

@media only screen and (max-width: 960px){

    .p-v-btn{
        font-size: 11px;
    }

}
</style>