<template>
  <div>
    <navBar/>
    <mainCont class="mainCont"/>
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

<style lang="scss" scoped>

.mainCont{
  margin-top: 80px;
}

</style>