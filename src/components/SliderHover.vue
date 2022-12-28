<template>
    <v-container fluid>
       <v-row  no-gutters >
            <v-col cols="md-4" 
                    @mouseover="hover1 = true"
                    @mouseleave="hover1 = false"
                    @click="$router.push('/dulces')"
                    :class="{hoverShow: hover1}"
                    >
                <v-img src="../assets/ContenidoMain/5.jpg" height="700">
  
                        <v-card height="700" class="img1" tile
                        v-model="hover1"
                        :class="{showCard : hover1}"
                        color="transparent">
                            <v-card-title>
                            AGNHEIGA
                            </v-card-title>
                            <v-card-text>
                                Texto de prueba
                            </v-card-text>
                        </v-card>

                </v-img>
            </v-col>
            <v-col cols="md-4" 
                    @mouseover="hover2 = true"
                    @mouseleave="hover2 = false"
                    @click="$router.push('/salados')"
                    :class="{hoverShow : hover2}">
                <v-img src="../assets/ContenidoMain/6.jpg" height="700" >
                    <v-card height="700" class="img1" tile
                        v-model="hover2"
                        :class="{showCard : hover2}"
                        color="transparent">
                            <v-card-title>
                            AGNHEIGA
                            </v-card-title>
                            <v-card-text>
                                Texto de prueba
                            </v-card-text>
                        </v-card>
                </v-img>
            </v-col>
            <v-col cols="md-4"                    
                    @mouseover="hover3 = true"
                    @mouseleave="hover3 = false"
                    @click="$router.push('/panificados')"
                    :class="{hoverShow : hover3}">
                <v-img src="../assets/ContenidoMain/7.jpg" height="700"  >
                    <v-card height="700" class="img1" tile
                        v-model="hover3"
                        :class="{showCard : hover3}"
                        color="transparent">
                        <v-card-title>
                            AGNHEIGA
                        </v-card-title>
                        <v-card-text>
                            Texto de prueba
                        </v-card-text>
                    </v-card>
                </v-img>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>

  export default {
    
    name: 'SliderHover',

    data: () => ({
        hover1: false,
        hover2: false,
        hover3: false,
        hover4: false,
    }),


  }
</script>

<style lang="scss" scoped>


/*.img1:hover, .img2:hover, .img3:hover, .img4:hover{
    width: 500px;    


}*/

.hoverShow{
    transform: scale(1.07);
    transition: 0.5s;
    z-index: 999;
}
.img1{
    
    opacity: 0;
}

.showCard{
    
    opacity: 1;
    transition: .5s;
}
</style>
