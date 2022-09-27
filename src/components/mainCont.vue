<template>
    <div>
        <h3>CONTENIDO MAIN</h3>
        <div>
      <h1 v-if="usuario.rol == 'admin' ">Admin</h1>
      <h2 v-if="usuario.rol == 'user' ">User</h2>
      <p>{{usuario}}</p>
        
  </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'mainCont',
        data: ()=>({

        }),
         computed:{
      ...mapState(['usuario']),
  },
    }
</script>