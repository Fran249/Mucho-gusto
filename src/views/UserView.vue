<template>
    <div>
        <navBar/>
        <v-container fluid>
            <v-row>
                <v-col cols="6" >
                    <updatePerfilComponent />
                </v-col>
                <v-col cols="6" >
                    <userDataComponent class="userData"/>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>


<script>

import navBar from '../components/navBar.vue'
import updatePerfilComponent from '@/components/updatePerfilComponent.vue';
import userDataComponent from '@/components/userDataComponent.vue';

    export default{
        name: 'UserView',
        components:{
            navBar,
            updatePerfilComponent,
            userDataComponent,
        },
        data:()=>({


            
        }),

    }
</script>

<style lang="scss" scoped>

.userData{
    margin-top: 20px
}


</style>