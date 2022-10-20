<template>
        <v-treeview :items="items" :multiple-active="true" transition open-all >
            <template v-slot:label="{ item }">
                <p class="item">{{ item.name }}</p>
            </template>
        </v-treeview>
</template>


<script>
    export default {
         name : 'menuFilter',
         data: ()=> ({
            items: [
                {   name: 'Panificados',
                    id: 1,
                    children: [
                        {   name : 'Pizza',
                            id: 2
                        },
                        {   name : 'Panchos',
                            id: 3
                        },
                        {   name : 'Plumas',
                            id: 4
                        },
                        {   name : 'Hamburguesa',
                            id: 5
                        },
                        {   name : 'Salvados',
                            id: 6
                        },
                        {   name : 'Pan',
                            id: 7
                        },        
                    ]
                }       
            ],
         }),
         methods:{

         },
         watch:{
  
         },
         computed:{
            
         }
    }
</script>


<style lang="scss" scoped>
@font-face{
    font-family: humanst521-1;
    src: url('/src/assets/Humanst521LtBTLight.ttf');
    };
    @font-face{
    font-family:humanst521-2;
    src: url('/src/assets/Humanst521BTBold.ttf');
    };
    @font-face{
    font-family: humans521-3;
    src: url('/src/assets/Hum521Rm.ttf');
    }
    @font-face {
    font-family: 'humanst521_btroman';
    src: url('/src/assets/hum521rm-webfont.woff2') format('woff2'),
         url('/src/assets/hum521rm-webfont.woff') format('woff');
    
    
    }
.item{
  font-family: humanst521-1;
  font-size: 15px;
  margin-top: 15px;
}




</style>