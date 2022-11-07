<template>
        <v-treeview :items="items" :multiple-active="true" transition >
            <template v-slot:label="{ item }">    
                <div v-if="item.name == 'Simples' || item.name == 'Rellenos' ">
                    <h3 >{{item.name}}</h3>
                    <div class="bar-container" v-if="item.name =='Simples'"></div>
                    <div class="bar-container" v-if="item.name =='Rellenos'"></div>
                </div>
                <div v-else >
                    <v-btn text class="item"  @click="select(item)" ><p class="mt-3">{{item.name}}</p></v-btn>
                    <v-btn text icon v-if="item.id == selected" @click="reset()">
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                </div>
                
            </template>
        </v-treeview>
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
    .v-btn {
  text-transform:none !important;
  
}
.item{
  font-family: humanst521-1;
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