<template>
        <v-expansion-panels  >
            <v-expansion-panel v-for="(item, i) in items" :key="i" style="background: #f0f0f0">
                <v-expansion-panel-header>
                    <div class="d-flex flex-column" style="gap: 15px">
                        <h3 >{{item.name}}</h3>
                    <div class="bar-container" v-if="item.name =='Simples'"></div>
                    <div class="bar-container" v-if="item.name =='Rellenos'"></div>
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
                    {   name : 'Sándwiches de Miga',
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
            select(it){
                this.selectedItemName = it.name
                this.selected = it.id
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
  text-align: left;
}
h3{
    font-family:  'humanst521-2';
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