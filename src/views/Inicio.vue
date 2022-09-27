<template>
  <div>
    <navBar/>
    <mainCont/>
  </div>
</template>

<script>

import navBar from '../components/navBar.vue'
import mainCont from '../components/mainCont.vue'

export default {
  name: 'InicIo',
  components:{
    navBar,
    mainCont,
  },
 

}
</script>