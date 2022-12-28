<template>
    <v-container fluid class="v-container">
        <v-row>
            <v-col  cols="3" xs="4" class="v-col-backG1" >

            </v-col>
            <v-col cols="3" xs="4" class="v-col-backG2">

            </v-col>
            <v-col cols="3" xs="4" class="v-col-backG3" @click="google">

            </v-col>
            <v-col cols="3" xs="4" class="v-col-backG4">

            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3" xs="4" class="v-col-backG5">

            </v-col>
            <v-col cols="3"  xs="4" class="v-col-backG6">

            </v-col>
            <v-col cols="3" xs="4" class="v-col-backG7">

            </v-col>
            <v-col cols="3" xs="4" class="v-col-backG8">

            </v-col>
        </v-row>
    </v-container>
</template>


<script>

    export default {
        name: "SucursalesVue",


        data: ()=> ({

        }),
        methods:{
         google(){
            window.open('https://goo.gl/maps/fcgcoR7e3866YiiM9', '_blank').focus();
         }
        }
    }

</script>


<style lang="scss" scoped>
    .v-container{
        position: relative;
    }
 .v-col-backG1{
    height: 200px;
    width: 200px;
    background-image: url('/src/assets/ContenidoMain/SucursalesVue/14B.jpg');
    background-size: cover;
    background-position:center 48%;
    transition: .5s;
}
.v-col-backG1:hover{
        background-image: url('/src/assets/ContenidoMain/SucursalesVue/14.jpg');
        background-size: cover;
        transition: .5s;
        background-position: 2%;
    }

 .v-col-backG2{
    height: 200px;
    width: 200px;
    background-image: url('/src/assets/ContenidoMain/SucursalesVue/16B.jpg');
    background-size: cover;
    background-position:center 48%;
    transition: .5s;
 }
 .v-col-backG2:hover{
    background-image: url('/src/assets/ContenidoMain/SucursalesVue/16.jpg');
    background-size: cover;
    transition: .5s;
    background-position: 2%;
 }
 .v-col-backG3{
    height: 200px;
    width: 200px;
    background-image: url('/src/assets/ContenidoMain/SucursalesVue/18B.jpg');
    background-size: cover;
    background-position:center 48%;
    transition: .5s;
 }
 .v-col-backG3:hover{
    background-image: url('/src/assets/ContenidoMain/SucursalesVue/18.jpg');
    background-size: cover;
    transition: .5s;
    background-position: 2%;
    cursor: pointer;
 }
 .v-col-backG4{
    height: 200px;
    width: 200px;
    background-image: url('/src/assets/ContenidoMain/SucursalesVue/19B.jpg');
    background-size: cover;
    background-position:center 48%;
    transition: .5s;
 }
 .v-col-backG4:hover{
    background-image: url('/src/assets/ContenidoMain/SucursalesVue/19.jpg');
    background-size: cover;
    background-position: 2%;
    transition: .5s;

 }
 .v-col-backG5{
    height: 200px;
    width: 200px;
    background-image: url('/src/assets/ContenidoMain/SucursalesVue/15B.jpg');
    background-size: cover;
    background-position:center 48%;
    transition: .5s;
 }
 .v-col-backG5:hover{
    background-image: url('/src/assets/ContenidoMain/SucursalesVue/15.jpg');
    background-size: cover;
    transition: .5s;
    background-position: 2%;
 }
 .v-col-backG6{
    height: 200px;
    width: 200px;
    background-image: url('/src/assets/ContenidoMain/SucursalesVue/13B.jpg');
    background-size: cover;
    background-position:center 48%;
    transition: .5s;
 }
 .v-col-backG6:hover{
    background-image: url('/src/assets/ContenidoMain/SucursalesVue/13.jpg');
    background-size: cover;
    transition: .5s;
    background-position: 2%;
 }
 .v-col-backG7{
    height: 200px;
    width: 200px;
    background-image: url('/src/assets/ContenidoMain/SucursalesVue/17B.jpg');
    background-size: cover;
    background-position:center 48%;
    transition: .5s;
 }
 .v-col-backG7:hover{
    background-image: url('/src/assets/ContenidoMain/SucursalesVue/17.jpg');
    background-size: cover;
    transition: .5s;
    background-position: 2%;
 }
 .v-col-backG8{
    height: 200px;
    width: 200px;
    background-image: url('/src/assets/ContenidoMain/SucursalesVue/20B.jpg');
    background-size: cover;
    background-position:center 48%;
    transition: .5s;
 }
 .v-col-backG8:hover{
    background-image: url('/src/assets/ContenidoMain/SucursalesVue/20.jpg');
    background-size: cover;
    transition: .5s;
    background-position: 2%;
    
 }
 h3{
    color: #fff;
 }


</style>