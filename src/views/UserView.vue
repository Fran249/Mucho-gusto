<template>
    <div>
        <navBar/>
        <updatePerfilComponent/>
    </div>
</template>


<script>

import navBar from '../components/navBar.vue'
import updatePerfilComponent from '@/components/updatePerfilComponent.vue';

    export default{
        name: 'UserView',
        components:{
            navBar,
            updatePerfilComponent,
        },
        data:()=>({


            
        }),

    }
</script>

<style lang="scss" scoped>




</style>