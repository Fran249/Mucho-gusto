<template>

        <v-expansion-panels  >
            <v-expansion-panel v-for="(item, i) in items" :key="i" style="background: #f0f0f0">
                <v-expansion-panel-header>
                    <div class="d-flex flex-column" style="gap: 15px">
                        <h3 >{{item.name}}</h3>
                        <div class="bar-container" v-if="item.name =='Dulces'">
                </div>
                    </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content v-for="it in item.children" :key="it.name">
                    <div>
                        <v-btn  text class="item"  @click="select(it)" ><p class="mt-3 ">{{it.name}}</p></v-btn>
                        
                    <v-btn text icon v-if="item.id == selected" @click="reset()">
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
</template>


<script>
import store from '@/store';


    export default {
         name : 'menuFilter',
         data: ()=> ({
            selectedItemName:'',
            selected : '',
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
            select(item){
                this.selectedItemName = item.name
                this.selected = item.id
            },
            reset(){
                this.selectedItemName = ''
                this.selected = ''
            }
         },
         watch:{
            selectedItemName(){
                this.selectedItemName = this.selectedItemName.toLowerCase();
                store.commit('filterValue',this.selectedItemName)
                console.log(this.selectedItemName)
                store.commit('forceRenderCarrito', + 1)
            }
         },
         computed:{
                
         }
    }
</script>


<style lang="scss" scoped>

    .v-btn {
  text-transform:none !important;
  
}
.item{
  font-family: 'humanst521-1';
  font-size: 18px;
  margin-right: 1px;
  width: 100%;
}

h3{
    font-family: 'humanst521-2';
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