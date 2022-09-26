<template>
  <div class="v-dialog">
      <h1>Registro de usuarios</h1>
      <form @submit.prevent="crearUsuario({email:email, password:pass1})">
          <input 
              type="email" 
              placeholder="Ingrese email"
              v-model="email"
          >
          <input 
              type="password" 
              placeholder="Ingrese contraseña"
              v-model="pass1"
          >
          <input 
              type="password" 
              placeholder="Repita contraseña"
              v-model="pass2"
          >

          <button type="submit" :disabled='!desactivar'>Registrar</button>
      </form>
  </div>

</template>

<script>
import {mapActions, mapState} from 'vuex'
  export default {
      name: 'RegistroComponent',
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
        height: 100%;
        margin: 0;
        padding: 15px;
    }

</style>