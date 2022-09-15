<template>
  <div>
      <h1>Ruta protegida</h1>
      <p>{{usuario}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'InicIo',
  computed:{
      ...mapState(['usuario'])
  }
}
</script>