<template>
 <v-app>
    <NavBarLandVue class="nav" v-if="!mobileViewMiddle"/>
    <NavBarMobile class="nav" v-if="mobileViewMiddle"/>
    <!--<SliderPreVideo class="slider-pre-video"/>-->
    <SliderPreVideoCarouselMobile v-if="mobileViewMiddle"/>
    <SliderPreVideoCarousel class="slider-pre-video" v-if="!mobileViewMiddle"/>
    <AboutUs/>
    <SliderHover class="slider-hover" v-if="!mobileViewMiddle"/>
    <SliderHoverMobile v-if="mobileViewMiddle"/>
    <!--<PreCocidos class="slider-hover"/>-->
    <!--<SucursalesVue class="sucursales-vue" v-if="!mobileViewMiddle"/>-->
    <v-btn
      v-if="
          !mobileViewSmall"
      elevation="9"
      fab
      fixed
      right
      bottom
      color="transparent"
    >
    <v-icon color="green" size="30">
      mdi-whatsapp
    </v-icon>
  </v-btn>
    <FooterLandVue/>
  </v-app>
</template>

<script>
  import NavBarLandVue from '@/components/NavBarLand.vue'
  import NavBarMobile from '../components/componentsMobile/NavBarMobile.vue'
  import SliderHoverMobile from '../components/componentsMobile/SliderHoverMobile.vue'
  import FooterLandVue from '@/components/FooterLand.vue'
  import SliderHover from '../components/SliderHover'
  //import SliderPreVideo from '../components/SliderPreVideo'
  import SliderPreVideoCarouselMobile from '../components/componentsMobile/SliderPreVideoCarouselMobile.vue'
  import SliderPreVideoCarousel from '../components/SliderPreVideoCarousel.vue'
  import AboutUs from '../components/AboutUs.vue'
  //import SucursalesVue from '../components/SucursalesVue.vue'
  //import PreCocidos from '../components/PreCocidos.vue'



  export default {
    name: 'HomeView',

    data: () => ({
      mobileViewSmall: false,
      mobileViewMiddle: false,
    }),

    components: {
    NavBarLandVue,
    NavBarMobile,
    FooterLandVue,
    SliderHover,
    SliderHoverMobile,
    SliderPreVideoCarousel,
    SliderPreVideoCarouselMobile,
    //SliderPreVideo,
    AboutUs,
    //SucursalesVue,
    //PreCocidos,
    
},
    methods:{
      mobileViewFunctionSmall(){
        
          this.mobileViewSmall = window.innerWidth <= 500;
          console.log('mobile version')
      },
      mobileViewFunctionMiddle(){
        
        this.mobileViewMiddle = window.innerWidth <= 960;
        console.log('mobile version')
    },

    },
    created(){
      this.mobileViewFunctionSmall();
      this.mobileViewFunctionMiddle();
    }
  }
</script>


<style lang="scss" scoped>
  
.slider-hover{
  
margin-top: 0px;

padding: 0px;
};

.slider-pre-video{
  margin-top: 64px;
  
  
}

.nav{
  z-index: 99999;
}


</style>
