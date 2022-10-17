<template>
  <div>
    <v-container fluid>
      
        <navBar/>
        <v-row>
          <v-col cols="3">
            <menuFilter class="menuFilter"/>
          </v-col>
        <v-col cols="9">
        <mainCont class="mainCont" :key="componentKey"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import navBar from '../components/navBar.vue'
import mainCont from '../components/mainCont.vue'
import menuFilter from '../components/menuFilter.vue'
import store from '@/store';

export default {
  name: 'InicIo',
  components:{
    navBar,
    mainCont,
    menuFilter,
  },
  data:()=>({
    filterState: store.state.filterState,
    componentKey: 0

  }),
 watch:{
  filterState(){
    console.log(this.filterState)
    this.componentKey += 1;
  }
 }

}
</script>

<style lang="scss" scoped>

.mainCont{
  margin-top: 80px;
}
.menuFilter{
  margin-top: 80px;
  position: fixed;
}

</style>