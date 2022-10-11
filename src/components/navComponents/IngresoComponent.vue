<template>
        <div class="v-dialog">
        <h1 class="d-flex justify-center mb-5">Ingreso de usuarios</h1>
      <form @submit.prevent="ingresoUsuario({email:email, password:pass})" class="form">
          <v-text-field
              type="email"
              placeholder="Ingrese email"
              v-model="email"
          ></v-text-field>
          <v-text-field
              type="password"
              placeholder="Ingrese contraseña"
              v-model="pass"
          ></v-text-field>
          <v-btn type="submit">Acceder</v-btn>
      </form>
      <p>{{error}}</p>
    </div>


</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: "IngresoComponent",
  data() {
      return {
          email: '',
          pass: '',
          
      }
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
        align-items: center;
        gap: 15px;
        
    }
</style>