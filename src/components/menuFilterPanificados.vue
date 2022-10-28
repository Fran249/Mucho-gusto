<template>
        <v-treeview :items="items" :multiple-active="true" transition open-all >
            <template v-slot:label="{ item }">
                <div v-if="item.name == 'Panificados'">
                    <h3 >{{item.name}}</h3>
                    <div class="bar-container" v-if="item.name =='Panificados'">
                </div>
                </div>
                <div v-else >
                    <v-btn text class="item"  @click="select(item)" ><p>{{item.name}}</p></v-btn>
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
            items: [
                {   name: 'Panificados',
                    id: 1,
                    children: [
                        {   name : 'Pizza',
                            id: 2
                        },
                        {   name : 'Panchos',
                            id: 3
                        },
                        {   name : 'Plumas',
                            id: 4
                        },
                        {   name : 'Hamburguesa',
                            id: 5
                        },
                        {   name : 'Salvados',
                            id: 6
                        },
                        {   name : 'Pan',
                            id: 7
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