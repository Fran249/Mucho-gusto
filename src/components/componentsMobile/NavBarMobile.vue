<template>
    <div>
    <v-app-bar fixed hide-on-scroll height="60" color="black">
        <v-row>
            <v-col cols="2">
                <v-btn icon dark class="opener" @click="openDrawer" >
                    <v-icon size="35" class="opener">
                        expand_more
                    </v-icon>
                </v-btn>
            </v-col>
            <v-col cols="7">
                <v-btn text class="mt-2" width="20px" @click="scroll4">
                    <v-img src="@/assets/ContenidoMain/2.png" class="img-nav">

                    </v-img>
                </v-btn>
            </v-col>  
            <v-col cols="3" class="col-iconos">
              <v-btn icon  color="white" href="https://www.instagram.com/muchogusto.info/" >
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
              <v-btn icon color="white" href="https://www.facebook.com/Mucho-Gusto-110256295138152" class="v-btn-f" >
                <v-img src="@/assets/ContenidoMain/F.png" class="v-imgF"></v-img>
              </v-btn>
              <v-btn icon color="white" href="https://wa.me/542284577478">
                <v-icon>mdi-whatsapp</v-icon>
              </v-btn>
            </v-col>
        </v-row>

    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      hide-overlay
      class="drawer-nav"
      width="70%"

    >
      <v-list
        nav
        dense
        class="flex-list"
      >

          <v-list-item>
            <v-list-item-title>
              <v-btn text class="ma-0 pa-0" @click="scroll1">
                <a  class="a-ref title1-1 " >QUIENES SOMOS</a>
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-divider color="white" width="60%"></v-divider>
          <v-list-item>
            <v-list-item-title>
              <v-menu z-index="9999999" offset-x right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text class="ma-0 pa-0"  v-bind="attrs"
                    v-on="on">
                  <a  class="a-ref title1-3 " >LOCAL</a>
                </v-btn>
                </template>
                <v-list flat text class="v-list-cont">
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn text class="ma-0 pa-0" >
                        <a  class="a-ref title1-1 " @click="google" >Olavarria</a>
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                  <v-divider color="white" width="60%"></v-divider>
                </v-list>
                <v-divider color="white" width="90%"></v-divider>
              </v-menu>
            </v-list-item-title>
          </v-list-item>
          <v-divider color="white" width="50%"></v-divider>
          <v-list-item>
            <v-list-item-title>
              <v-btn text class="ma-0 pa-0" >
                <h3 class="title-mg1 ">TRABAJÁ CON NOSOTROS</h3>
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-divider color="white" width="80%"></v-divider>
          <v-list-item>
            <v-list-item-title>
              <v-btn text class="ma-0 pa-0"  @click="$router.push('/MuchoGustoCompras')">
                <a  class="a-ref title1-2  " >TIENDA</a>
              </v-btn>
            </v-list-item-title>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script>
export default{
    data:()=>({
        name:'NavBarMobile',

        drawer: false, 
      
    }),
    methods:{
        openDrawer(){
            this.drawer = true
        },
        scroll1(){
        window.scrollTo(0, 450);
        this.drawer = false
      },
      scroll2(){
        window.scrollTo(0,1200);
        this.drawer = false
      },
      scroll3(){
        window.scrollTo(0,3000);
        this.drawer = false
      },
      scroll4(){
        window.scrollTo(0,0)
      },
      google(){
            window.open('https://goo.gl/maps/fcgcoR7e3866YiiM9', '_blank').focus();
         }
    }
}

</script>


<style lang="scss" scoped>

.opener{
  margin-left: 0;
  padding: 0;
  margin-right: 20px;
}


.v-list-cont{
  background: rgb(0,0,0);
  background: linear-gradient(140deg, rgba(0,0,0,0.927608543417367) 37%, rgba(255,255,255,0) 100%);
  width: 165px;
}

.col-iconos{
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  padding: 0;
  height: 60px;
        .v-imgF{
      transform: scale(0.25);
    }

}



.drawer-nav{
  background: rgb(0,0,0);
  background: linear-gradient(140deg, rgba(0,0,0,0.927608543417367) 37%, rgba(255,255,255,0) 100%);


}
.flex-list{
    display: flex;
    flex-direction: column;
    margin-top: 250px;
    
    

}

.title-mg1{
  color:#FFF;
  font-family: 'humanst521-1';
  font-weight: lighter;
  font-size: 14px;
  margin-top: 3px;
  }


.img-nav{
  transform: scale(0.35);
}

.v-imgBriefcase{
  transform: scale(0.35);
}

.title1-1 , .title1-2, .title1-3{
    color:#FFF;
  font-family: 'humanst521-1';
  font-weight: lighter;
  font-size: 14px;
  margin-top: 3px;
  
}

.a-ref{
  text-decoration: none;
  color:#FFF
}
.a-ref:active{
  text-decoration: none;
  color: #FFF;
}
.a-ref:hover{
  text-decoration: none;
  color: #FFF;
}

</style>