<template>
  <div>
      <h1 v-if="usuario.rol == 'admin' ">Admin</h1>
      <h2 v-if="usuario.rol == 'user' ">User</h2>
      <p>{{usuario}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'InicIo',
  computed:{
      ...mapState(['usuario']),
  },

}
</script>