<template>
    <div>
        <v-treeview
        hoverable
        activatable
        :items="items"
        selectable
        v-model="selection"
        selection-type="independent"
        open-on-click
        return-object
        ></v-treeview>
    </div>
</template>


<script>
    import store from '@/store'
    export default {
         name : 'menuFilter',
         data: ()=> ({
            selection:[],
            items: [
            {
                id: 1,
                name: 'Salados ',
                children: [
                    {   id: 2,
                        name: 'Simples',
                        selectable: true,

                    children : [
                        {
                            id:3,
                            name: 'Cremona'
                        },
                        {
                            id:4,
                            name: 'Bizcocho'
                        },
                        {
                            id:5,
                            name: 'Grisín'
                        },
                        {
                            id:6,
                            name: 'Fajita Saborizada'
                        },
                        {
                            id:7,
                            name: 'Marineras'
                        },
                        {
                            id:8,
                            name: 'Fosforitos'
                        }
                    ] },
                    {   id: 9, 
                        name: 'Rellenos',
                        selectable: true,
                        children: [
                            {
                                id: 10,
                                name: 'Chips',
                            },
                            {
                                id: 11,
                                name: 'Sanguches Miga'
                            },
                            {
                                id: 12,
                                name: 'Pebetes',
                            },
                        ] 
                    },
                    
                ],
                },
                {   id:13, name: 'Panificados',
                    children:[
                            {
                                id: 14,
                                name: 'Pizzas',
                            },
                            {
                                id: 15,
                                name: 'Panchos',
                            },
                            {
                                id: 16,
                                name: 'Plumas',
                            },
                            {
                                id: 17,
                                name: 'Hamburguesa',
                            },
                            {
                                id: 18,
                                name: 'Salvado',
                            },
                            {
                                id: 19,
                                name: 'Pan',
                            },
                    ]
                },
                {   id: 20, name: 'Dulces',
                    children: [
                            {
                                id: 21,
                                name: 'Alfajores',
                            },
                            {
                                id: 22,
                                name: 'Cremonas',
                            },
                            {
                                id: 23,
                                name: 'Facturas',
                            },
                            {
                                id: 24,
                                name: 'Masas Finas',
                            },
                            {
                                id: 25,
                                name: 'Masas Secas',
                            },
                            {
                                id: 26,
                                name: 'Hojaldre',
                            },
                            {
                                id: 27,
                                name: 'Milhojas',
                            },
                            {
                                id: 28,
                                name: 'Palitos Materos',
                            },
                            {
                                id: 29,
                                name: 'Pañuelitos',
                            },
                            {
                                id: 30,
                                name: 'Palmeritas',
                            },
                            {
                                id: 31,
                                name: 'Cañoncitos',
                            },
                            {
                                id: 32,
                                name: 'Fosforito',
                            },
                    ]
                },
            ]
         }),
         methods:{

         },
         watch:{
            selection(){
                this.selection.forEach(element=>{
                    
                    store.commit("filterState", element.name)
                    console.log(store.state.filterState)
                })
            }
         },
         computed:{
            
         }
    }
</script>