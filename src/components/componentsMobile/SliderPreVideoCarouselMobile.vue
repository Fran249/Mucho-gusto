<template>
    <div>
    <v-carousel 
    hide-delimiter-background
    show-arrows-on-hover
    height="500"
    cycle
    interval="5000"
    
      >
      
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"

        class="v-flex-cont"
      >
      <div class="v-btn-container" v-if="item.identifier == true">
        <v-btn class="v-btn" @click="dialog = true">
            Ver Video
        </v-btn>
    </div>
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
            ]
        }),
    }
</script>

<style lang="scss" scoped>
    .v-btn-container{
        width: 100%;
        height: 100%;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        .v-btn{
            margin-bottom: 70px;
            width: 30%;
        }

    }

</style>