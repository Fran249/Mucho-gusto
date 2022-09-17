<template>
    <IngresoComponent v-if="!existeUsuario"/>
</template>

<script>
import { mapState , mapGetters} from 'vuex'
import IngresoComponent from '@/components/IngresoComponent.vue'
export default {
    name: 'IngrEso',
    components: {
    IngresoComponent,
},
    data() {
        return {
            email: '',
            pass: ''
        }
    },
    created(){

    },
    methods:{
        
    },
    computed:{
        ...mapState(['error']),
        ...mapGetters(['existeUsuario'])
        
    }
}
</script>