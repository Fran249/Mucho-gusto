<template>
    <div class="v-container">
        <h3>Dulces</h3>
        <v-list v-for="dulce in Dulces" :key="dulce.id">
                <v-btn text x-small >
                    {{dulce.name}}
                </v-btn>
        </v-list>
    </div>
</template>


<script>
    export default {
         name : 'menuFilter',
         data: ()=> ({
            Dulces: [
                {   name : 'Alfajores',
                    id: 1
                },
                {   name : 'Cremonas',
                    id: 2
                },
                {   name : 'Facturas',
                    id: 3
                },
                {   name : 'Masas Finas',
                    id: 4
                },
                {   name : 'Masas Secas',
                    id: 5
                },
                {   name : 'Hojaldre',
                    id: 6
                },
                {   name : 'Mil Hojas',
                    id: 7
                },
                {   name : 'Palitos Materos',
                    id: 8
                },
                {   name : 'Pañuelitos',
                    id: 9
                },
                {   name : 'Palmeritas',
                    id: 10
                },
                {   name : 'Cañoncitos',
                    id: 11
                },
                {   name : 'Fosforito',
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