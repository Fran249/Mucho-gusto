<template>
    <div class="v-container">
        <h3>Simples</h3>
        <v-list v-for="simple in Simples" :key="simple.id">

                <v-btn text x-small >
                    {{simple.name}}
                </v-btn>
 
        </v-list>
        <h3>Rellenos</h3>
        <v-list v-for="relleno in Rellenos" :key="relleno.id">
                <v-btn text x-small>
                    {{relleno.name}}
                </v-btn>
        </v-list>
    </div>
</template>


<script>
    export default {
         name : 'menuFilter',
         data: ()=> ({
            Simples: [
                {   name : 'Cremona',
                    id: 1
                },
                {   name : 'Bizcocho',
                    id: 2
                },
                {   name : 'Grisín',
                    id: 3
                },
                {   name : 'Fajita Saborizada',
                    id: 4
                },
                {   name : 'Marineras',
                    id: 5
                },
                {   name : 'Fosforitos',
                    id: 6
                },
                
            ],
            Rellenos: [
                
                {   name : 'Chips',
                    id: 7
                },
                {   name : 'Sanguches de Miga',
                    id: 8
                },
                {   name : 'Sacramentos',
                    id: 9
                },
                {   name : 'Pebetes',
                    id: 10
                },
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