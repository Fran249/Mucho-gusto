<template>
    <div>
    <nav-bar/>
    </div>
</template>

<script>
import navBar from '../components/navBar.vue'


    export default {

        name: 'MisCompras',
        components:{
            navBar
        },

        data: ()=>({
            productos: null,
        }),

        }
</script>