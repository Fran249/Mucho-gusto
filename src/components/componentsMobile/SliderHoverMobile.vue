
<template>
  <v-carousel hide-delimiters
  
    >
    
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"

    >
    
        <v-card color="transparent" class="v-card-carousel" @mouseover="mostrarCard" @mouseleave="ocultarCard">
            <v-card-title class="v-card-title" v-if="mostrar">
            {{ item.title }}
            </v-card-title>
            <v-card-text >
               <p class="v-card-text" v-if="mostrar">
                {{item.text}}
                </p>
            </v-card-text>
        </v-card>
    </v-carousel-item>
  </v-carousel>
</template>


<script>
export default{
    name:'SliderHoverMobile',

    
    data: ()=>({
        mostrar: false,


        items: [
          {
            
            src: 'https://i.imgur.com/viWSPQC.jpg',
            title: 'AGDAG111',
            text: 'fsafsafasfasf111'
          },
          {
            
            src: 'https://i.imgur.com/t2zCGoV.jpg',
            title: 'AGDAG222',
            text: 'fsafsafasfasf222'
          },
          {
            
            src: 'https://i.imgur.com/SNTzgxq.jpg',
            title: 'AGDAG333',
            text: 'fsafsafasfasf333'
          },

        ],
    }),
    methods:{
        mostrarCard(){
            this.mostrar = true
        },
        ocultarCard(){
            this.mostrar = false
        }
    }
}


</script>


<style lang="scss" scoped>
    .v-card-carousel{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .v-card-title{
            display: flex;
            align-self: center;
        };

    }

</style>