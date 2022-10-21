<template>
    <div>
        <navBar/>
        <v-container fluid>
            <h3 class="ml-10 mb-3">MI PERFIL</h3>
            <div class="linear-cont">
                <v-progress-linear 
                background-color="#b3b6bc" 
                color="#f2c04a" 
                value="30">
                </v-progress-linear>
            </div>
            <v-row>
                <v-col cols="5" >
                    <updatePerfilComponent class="ml-15" />
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
    @font-face {
    font-family: 'humanst521_btbold';
    src: url('/src/assets/humanst521_bt_bold-webfont.woff2') format('woff2'),
         url('/src/assets/humanst521_bt_bold-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;

}
h3{
    font-family: humanst521-2;
    font-weight: bolder;
  font-size: 25px;
}
.linear-cont{
    width: 95%;
    margin-left: 2%;
}
.userData{
    margin-top: 20px
}


</style>