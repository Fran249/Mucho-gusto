<template >
    
    <v-parallax  :src='srcs' :height="height">
        <div class="div-container">
        <h3 class="h3-title " >
            QUIENES
            <h3 class="h3-title2">
             SOMOS
            </h3>
        </h3>
        <div class="text-container" >
            <p class="text1">
                Somos una empresa dedicada a la elaboración y comercialización de una amplia gama de productos relacionados estrechamente con la panadería y la calidad.
            </p>
            <p class="text2">
                Tenemos nuestra propia planta de elaboración equipada con las mejores tecnologías para lograr panificados saludables y deliciosos, combinando métodos tradicionales y artesanales para brindar un servicio de excelencia. 
            </p>
            <p class="text3">
                Nos definen los valores de quienes trabajamos en ella a diario y por la excelencia de nuestros productos.
            </p>
        </div>
    </div>
    </v-parallax>

</template>

<script>
    export default {
      name: 'AboutUs',
  
      data: () => ({
            srcs: '',
            height:'',
        }),
        methods:{
            srcChange(){

                
            this.srcs = window.innerWidth;


            if(this.srcs <= 960){
                this.srcs= 'https://i.imgur.com/jiM6Uad.jpg'
                this.height = '800'
            } else if (this.srcs >= 960){
                this.srcs = 'https://i.imgur.com/2CLZ4yx.jpg'
                this.height = '1000'
            }
        }
        },
        created(){
        this.srcChange();
    }

      }
  </script>

  <style lang="scss" scoped>

    

    .div-container{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        margin-top: 30%;
        margin-bottom: 25%;
        
    }
    .h3-title{
        grid-column: 2;
        grid-row: 1;
        display: flex;
        justify-self: center;
        align-self: center;
        flex-direction: column;
        font-family: 'humanst521-1';
        font-size: 50px;
        color: #fff;
        text-align: center;
       
    }

    .h3-title2{
        font-family: 'humanst521-2';
        font-size: 100px;
        color: #FEBF2C
    }
    .text-container{
        
        grid-column: 2;
        grid-row: 2;
        display: flex;
        flex-direction: column;
        justify-self: center;
        margin-left: 30px;
        
        .text1{
            font-family: 'humanst521_btroman';
        color: #fff;
        font-size: 20px;
        text-align: match-parent;
        word-spacing: 2px;
        line-height: 30px;
        }
        .text2{
            font-family: 'humanst521_btroman';
        color: #fff;
        font-size: 20px;
        text-align: match-parent;
        word-spacing: 2px;
        line-height: 30px;
        }
        .text3{
            font-family:'humanst521_btroman';
        color: #fff;
        font-size: 20px;
        text-align: match-parent;
        word-spacing: 2px;
        line-height: 30px;
        }
        
    }
    @media only screen and (max-width: 960px){
        

        .div-container{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 250px 500px;
        margin-top: 0;
        margin-bottom: 25%;
        
    }
        .h3-title{
            font-size: 25px;
            
            .h3-title2{
                font-size: 85px;
            }
        }
        .text-container{
            margin-left: 3%;
        }
        .text1, .text2, .text3{
            font-size: 20px;
        }


    }
    
  </style>