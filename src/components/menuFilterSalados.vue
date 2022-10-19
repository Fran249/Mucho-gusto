<template>
    <div class="v-container">
        <v-treeview :items="items" :multiple-active="true"></v-treeview>
    </div>
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

.v-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}



</style>