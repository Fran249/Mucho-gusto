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

.fotoContainer__1{
    width: 500px;
    display: flex;
    flex-direction: column;
    
}
.fotoContainer__2{

    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 20px;

}


</style>