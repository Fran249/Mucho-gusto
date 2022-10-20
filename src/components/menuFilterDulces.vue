<template>
        <v-treeview :items="items" :multiple-active="true" transition open-all>
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
                 {
                    name:'Dulces',
                    id:1,
                    children:[
                        {   name : 'Alfajores',
                            id: 2
                        },
                        {   name : 'Cremonas',
                            id: 3
                        },
                        {   name : 'Facturas',
                            id: 4
                        },
                        {   name : 'Masas Finas',
                            id: 5
                        },
                        {   name : 'Masas Secas',
                            id: 6
                        },
                        {   name : 'Hojaldre',
                            id: 7
                        },
                        {   name : 'Mil Hojas',
                            id: 8
                        },
                        {   name : 'Palitos Materos',
                            id: 9
                        },
                        {   name : 'Pañuelitos',
                            id: 10
                        },
                        {   name : 'Palmeritas',
                            id: 11
                        },
                        {   name : 'Cañoncitos',
                            id: 12
                        },
                        {   name : 'Fosforito',
                            id: 13
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


<style>
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