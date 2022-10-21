<template>
        <v-treeview :items="items" :multiple-active="true" transition>
            <template v-slot:label="{ item }">
                <h3 v-if="item.name == 'Simples' || item.name == 'Rellenos' ">{{item.name}}</h3>
                <p class="item" v-else>{{ item.name }}</p>
                <v-progress-linear 
                v-if="item.name =='Simples'"
                background-color="#b3b6bc" color="#f2c04a" value="30" width="500px"></v-progress-linear>
                <v-progress-linear 
                v-if="item.name =='Rellenos'"
                background-color="#b3b6bc" color="#f2c04a" value="30" width="500px"></v-progress-linear>
                
            </template>
        </v-treeview>
</template>


<script>
    export default {
         name : 'menuFilter',
         data: ()=> ({
            items:[
                {
                    name: 'Simples',
                    id: 1,
                    children: [
                        {   name : 'Cremona',
                            id: 2
                        },
                        {   name : 'Bizcocho',
                            id: 3
                        },
                        {   name : 'Grisín',
                            id: 4
                        },
                        {   name : 'Fajita Saborizada',
                            id: 5
                        },
                        {   name : 'Marineras',
                            id: 6
                        },
                        {   name : 'Fosforitos',
                            id: 7
                        },
                    ]
                },
                {
                    name: 'Rellenos',
                    id: 8,
                    children: [
                    {   name : 'Chips',
                        id: 9
                    },
                    {   name : 'Sanguches de Miga',
                        id: 10
                    },
                    {   name : 'Sacramentos',
                        id: 11
                    },
                    {   name : 'Pebetes',
                        id: 12
                    },
                        ] 
                }
                
            ],
            Rellenos: [
                
               
            ]
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
h3{
    font-family: humanst521-2;
    font-weight: bolder;
    font-size: 20px;
    margin-bottom: 5px;
}




</style>