<template>
    <div>
    <v-carousel 
    hide-delimiter-background
    show-arrows-on-hover
    :height="height"
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
        <v-btn color="#febf2c" class="v-btn" @click="dialog = true">
            <p class="mt-4 p-v-btn ">
                      VER VIDEO
                    </p>
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
                    <source src="../assets/videoPanaderia.mp4" type="video/mp4">
                </video>
        
            </v-dialog>
        </div>
    </div>
  </template>


<script>
    export default{
        name:'SliderPreVideoCarousel',

        data:()=>({
            dialog: false,
            height:'',
            items:[
                {   index: 1,
                    identifier: false,
                    src: 'https://i.imgur.com/uVrQRmy.jpg'
                },
                {   index: 2,
                    identifier: true,
                    src: 'https://i.imgur.com/fOfwBsx.jpg'
                },
                {   index: 3,
                    identifier: false,
                    src: require('../assets/TrabajaConNosotros.jpg')
                },

            ]
        }),
        methods:{
            changeHeightCarousel(){
                if(window.innerHeight >= 777){
                    this.height = 1300;
                    
                }else if (window.innerHeight <= 622){
                    this.height = 900
                    
                }

            }

        },
        created(){
            this.changeHeightCarousel();
        }
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
            width: 10%;
        }

    }

    .v-btn {
  text-transform:none !important;
}
.p-v-btn{
    font-family: 'humanst521_btbold';
    color: #fff
}
</style>