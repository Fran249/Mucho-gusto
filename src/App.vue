<template>
  <v-app>
    <v-main>
        <router-view/>
  </v-main>
</v-app>
</template>

<script>


export default {
  data: ()=>({
     name: 'app'


        
  }),
  components:{

    
},


}
</script>


<style lang="scss" >
  .v-navigation-drawer {
z-index: 999999 !important;
}
#nav{
 z-index: 99;
}
  
</style>