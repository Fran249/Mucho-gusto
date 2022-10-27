<template>
        <v-treeview :items="items" :multiple-active="false" transition open-all item-text v-model="select">
            <template v-slot:label="{ item }" >
                <h3 v-if="item.name == 'Dulces'">{{item.name}}</h3>
                <div class="d-flex flex-row" v-if="!item.children">
                    <v-checkbox v-model="item.selected" />
                    <p class="item" >{{item.name}}</p>
                </div>
                <div class="bar-container" v-if="item.name =='Dulces'">
                </div>
                 
            </template>
        </v-treeview>
</template>


<script>

    export default {
         name : 'menuFilter',
         data: ()=> ({
            texto: '',
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
            select: {
                get(value){
                    return value
                },
                set(value){
                    console.log(value)
                }
            }
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
h3{
    font-family: humanst521-2;
    font-weight: bolder;
    font-size: 20px;
    margin-bottom: 5px;
}

.bar-container{
  width: 95%;
  height: 0.2rem;
  display: flex;
  flex-direction: row;
  background: rgb(242,192,74);
  background: linear-gradient(90deg, rgba(242,192,74,1) 70px, rgba(179,182,188,1) 70px);
}

</style>