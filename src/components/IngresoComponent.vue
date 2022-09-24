<template>
        <div class="v-dialog">
        <h1>Ingreso de usuarios</h1>
      <form @submit.prevent="ingresoUsuario({email:email, password:pass})" class="form">
          <input 
              type="email"
              placeholder="Ingrese email"
              v-model="email"
          >
          <input 
              type="password"
              placeholder="Ingrese contraseña"
              v-model="pass"
          >
          <button type="submit">Acceder</button>
      </form>
      <p>{{error}}</p>
    </div>


</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'IngrEso',
  data() {
      return {
          email: '',
          pass: '',
          dialog1: false,
      }
  },
  created(){

  },
  methods:{
      ...mapActions(['ingresoUsuario']),
      
  },
  computed:{
      ...mapState(['error'])
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
    .form{
        display: flex;
        flex-direction: column;
        
    }
</style>