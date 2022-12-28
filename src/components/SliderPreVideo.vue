<template>
    <div class="div-container">    
        <v-img   class="d-flex align-center v-img1"  src="">
            <div class="d-flex flex-row ml-2" >
 
                <v-spacer></v-spacer>
                <v-btn icon class="d-flex justify-end" @click="mover()" >
                    <v-icon :color="varColor" >
                        arrow_forward_ios
                    </v-icon>
                </v-btn>
            </div>
        </v-img>
        <v-img   class="d-flex align-center v-img2"  src=""  >                
            <div  class="d-flex flex-row ml-2" >
                <v-row >
                <v-col cols="4" class="d-flex align-center" >
                <v-btn icon  @click="mover()">
                    <v-icon :color="varColor" >
                        arrow_back_ios
                    </v-icon>
                </v-btn>
                </v-col>
                <v-col cols="4" class="d-flex justify-center v-col-btn">

                <v-btn  width="100px" @click="dialog = true">
                        VER VIDEO
                </v-btn>
                </v-col>
                <v-col cols="4">

                </v-col>
            </v-row>
            </div>


        </v-img>
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


export default {
    name: 'SliderPreVideo',
   
  

    data: ()=>({

        dialog: false,
        varColor: '',
        
    }),

    methods: {
        mover(){
            const imgConst = document.querySelector(".v-img2");

            imgConst.classList.toggle("v-imgvolver")
 


        },
        varColorChange(){
            this.varColor = window.innerWidth;
            if(this.varColor <= 500){
                this.varColor = 'black'
            } else if (this.varColor >= 500){
                this.varColor= 'white'
            }
        }
    
    },
    created(){
        this.varColorChange();
    }

}



</script>

<style lang="scss" scoped>


.div-container{
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    position: relative;
}

.v-img1{
    grid-column: 1;
    grid-row: 1;
    order: 1;
    background-image: url('../assets/ContenidoMain/1.jpg');
    background-size: cover;
    height: 1000px;
    background-position: center;
}
.v-img2{
    grid-column: 1;
    grid-row: 1;
    transform:translateX(-9000px);
    transition: 1s;
    order: 2;
    background-image: url('../assets/ContenidoMain/3.jpg');
    background-size: cover;
    background-position: center;
    height: 1000px;
}

.v-imgvolver{
    z-index: 99;
    transform:translateX(0px);
    transition: .6s;
}


.v-col-btn{
    margin-top: 500px;
}
                    ///Media querys////
    @media only screen and (max-width: 960px) {
        
        .v-img1{
            background-position: center;
            background-size: cover;
            height: 325px;
        }
        .v-img2{
            background-position: center;
            height: 325px;
            
            .v-col-btn{
                margin-top: 225px;
            }
        }



    }
</style>