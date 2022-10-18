<template>
    <div class="v-container">
        <h3>Panificados</h3>
        <v-list v-for="pan in Panificados" :key="pan.id">
                <v-btn text x-small >
                    {{pan.name}}
                </v-btn>
        </v-list>
    </div>
</template>


<script>
    export default {
         name : 'menuFilter',
         data: ()=> ({
            Panificados: [
                {   name : 'Pizza',
                    id: 1
                },
                {   name : 'Panchos',
                    id: 2
                },
                {   name : 'Plumas',
                    id: 3
                },
                {   name : 'Hamburguesa',
                    id: 4
                },
                {   name : 'Salvados',
                    id: 5
                },
                {   name : 'Pan',
                    id: 6
                },               
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

.v-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}



</style>