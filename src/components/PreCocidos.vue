<template>
    <v-container fluid class="ma-0" >
        <v-img src="" height="500" class="v-img-1">
                <v-col cols="12" class="grid-container">
                    <h3 class="div-texto">
                        <h3 class="div-texto-strong">
                            PRE
                        </h3>
                            COCIDOS
                    </h3>
                    <v-btn icon class="btn" @click="mover">
                    <v-icon color="white">
                        arrow_forward_ios
                    </v-icon>
                </v-btn>
            </v-col>

        </v-img>
            <v-container fluid class=" v-img-2 pa-0 mb-0" >
                <v-row no-gutters >
                    <v-col cols="4" >
                            <v-img class="v-img1"  height="500">

                            </v-img>
                    </v-col>
                    <v-col cols="4">
                        <v-img class="v-img2" height="500" >

                        </v-img>
                    </v-col>
                    <v-col cols="4" class="v-img3" height="500">
                        <div class="div-btn">
                                <v-btn icon  @click="mover()" class="v-btn">
                                    <v-icon color="#FFF">
                                        arrow_back_ios
                                    </v-icon>
                                </v-btn>
                            </div>
                    </v-col>
                </v-row>

            </v-container>
    </v-container>
</template>


<script>
    export default {
        name: 'PreCocidos',
        data: ()=>({

        }),
        methods: {
        mover(){
            const imgConst = document.querySelector(".v-img-2");

            imgConst.classList.toggle("v-img-2-volver")
 


        },
    
    },

    }
</script>

<style lang="scss" scoped>



    .grid-container{
        display: grid;
        grid-template-rows: repeat(3,166.6px);
        grid-template-columns: repeat(3,1fr);
        .div-texto{
            display: flex;
            justify-content: center;
            align-self: center;
            grid-column: 2;
            grid-row: 2;
            font-family: humanst521-2;
            font-size: 120px;
            color: #fff;
            text-align: center;
            font-weight: 100;

        }
        .div-texto-strong{
            font-family: humanst521-1;
            font-size: 120px;
            
            color: #fff;
            text-align: center;
        }
        .btn{
            display: flex;
            justify-self: center;
            align-self: center;
            transform: scale(1.7);
            grid-column: 4;
            grid-row: 2;
        }

    }
    .div-btn{
        display: flex;
        margin-top: 10px;
        justify-content: right;
        height: 500px;
        .v-btn{
        display: flex;
        align-self: center;
        justify-self: center;
        transform: scale(1.7);
        margin-left: 3px;
        
        }
    }




    .v-img-1{
        
        position: absolute;
        background-image: url('../assets/ContenidoMain/8.jpg');
        background-size: cover;
    }
    .v-img-2{
        
        height:500px;
        transform:translateX(-9000px);
        transition: 1s;
        order: 2;
        background-color: #000;
    }
    .v-img-2-volver{
        z-index: 99;
        transform:translateX(0px);
        transition: .6s;
    }
    .v-img1{
        background-image: url('../assets/ContenidoMain/9.jpg');
        background-size: cover;
        transition: .5s;


    }
    .v-img1:hover{
            background-image: url('../assets/ContenidoMain/9B.jpg');
            background-size: cover;
            background-position: 1%;
            transition: .5s;
        }
    .v-img2{
            background-image: url('../assets/ContenidoMain/10B.jpg');
            background-size: cover;
            transition: .5s;
    }
    .v-img2:hover{
            background-image: url('../assets/ContenidoMain/10.jpg');
            background-size: cover;
            background-position: 1%;
            transition: .5s;
    }
    .v-img3{
                background-image: url('../assets/ContenidoMain/11.jpg');
                background-size: cover;
            }
    .v-img3:hover{
                background-image: url('../assets/ContenidoMain/11B.jpg');
                background-size: cover;
                background-position: 1%;
                transition:.5s;
    }


    @media only screen and (max-width: 360px){
        

        



    }


</style>