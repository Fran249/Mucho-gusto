<template>
    <div>
    <v-carousel 
    hide-delimiter-background
    show-arrows-on-hover
    height="240"
    cycle
    interval="5000"
    
      >
      
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        
      
       
      >

    <v-img :src="item.src" width="100%" height="100%" contain>
 <!--        <div class="v-btn-container" v-if="item.identifier == true">
        <v-btn color="#febf2c" class="v-btn" @click="dialog = true">
            <p class="mt-4 p-v-btn ">
                      Ver video
                    </p>
        </v-btn>
    </div>-->
    </v-img>
      </v-carousel-item>
    </v-carousel>
    <div >
        <v-dialog
        v-model="dialog"
        width="800"
        v-if="dialog == true"
        >    

                <video  controls class="video1">
                    <source src="@/assets/videoPanaderia.mp4" type="video/mp4">
                </video>
        
            </v-dialog>
        </div>
    </div>
  </template>


<script>
    export default{
        name:'SliderPreVideoCarouselMobile',

        data:()=>({
            dialog: false,

            items:[
                {   
                    identifier: false,
                    src: 'https://i.imgur.com/H55mDqI.jpg'
                },
                {   
                    identifier: true,
                    src: 'https://i.imgur.com/KRebmZm.jpg'
                },
                {   index: 3,
                    identifier: false,
                    src: 'https://i.imgur.com/mlC0zPx.jpg'
                },

            ]
        }),
    }
</script>

<style lang="scss" scoped>
    .v-btn {
  text-transform:none !important;
}
.p-v-btn{
    font-family: 'humanst521_btbold';
    color: #fff
}

</style>