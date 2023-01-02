<template>
    <div>
        <navBar/>
        <v-navigation-drawer
        fixed
        temporary
        right 
        v-model="carritoCompra"
        :width="widthPercent()">
         <Carrito :key="componentKey"/>
        </v-navigation-drawer>
        <v-container fluid v-if="width >= 960">
            <div>
                <h3 class="h3-title mb-3">MI PERFIL</h3>
                <div class="bar-container">
                </div>
            </div>
            <v-row>
                <v-col cols="3" >
                    <updatePerfilComponent class="updatePerfilComp" />
                </v-col>
                <v-col cols="9" >
                    <userDataComponent class="userData"/>
                </v-col>
            </v-row>
        </v-container>
        <v-container fluid v-else>
            <div>
                <h3 class="h3-title mb-3">MI PERFIL</h3>
                <div class="bar-container">
                </div>
            </div>
            <v-row>
                <v-col cols="12" >
                    <updatePerfilComponent class="updatePerfilComp" />
                </v-col>
                <v-col cols="12" >
                    <userDataComponent class="userData"/>
                </v-col>
            </v-row>
        </v-container>
        <div style="width: 100%; text-align: center;" class="d-flex flex-row justify-center align-center">
            <p>¿Por qué solicitamos estos datos? 

Tus datos personales se toman sólo con los fines de cumplir con el giro comercial de la empresa y hacer un correcto seguimiento a tu pedido. Es importante que los datos que ingreses sean verdaderos por si necesitamos contactarte para validar datos de tu compra. Recordá que deberás ser mayor de edad.

Cada usuario dispondrá en todo momento de los derechos de acceso a la información, rectificación y supresión de sus datos personales conforme a la Ley Nº 25.326 sobre protección de datos de carácter personal.  El usuario tiene el derecho gratuito de ejercer el acceso, rectificar y suprimir sus datos. La Dirección Nacional de Protección de Datos Personales, órgano de control de la Ley Nro. 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan en relación con el incumplimiento de las normas sobre protección de datos personales.

</p>
        </div>
    </div>
</template>


<script>

import navBar from '../components/navBar.vue'
import updatePerfilComponent from '@/components/updatePerfilComponent.vue';
import userDataComponent from '@/components/userDataComponent.vue';
import Carrito from '@/components/Carrito.vue'
import store from '@/store';

    export default{
        name: 'UserView',
        components:{
            navBar,
            updatePerfilComponent,
            userDataComponent,
            Carrito,
        },
        data:()=>({
            componentKey: store.state.forceRenderCarrito,
            width: window.innerWidth
        }),
        methods:{
            widthPercent(){
                if(window.innerWidth >960){
                    return '25%'
                }else {
                return '100%'
                }
            },
            changeValue(){
                
                if(window.innerWidth >= 1400){
                    return 10
                }
                else {
                    return 13
                }

            }
        },
        watch:{
        componentKey(){
            this.componentKey = store.state.forceRenderCarrito
            
        }
        },
        computed:{
            carritoCompra: {
        get () {
          return store.state.carrito
        },
        set (value) {
          store.commit('toggleCarrito', value)
        }
      },
        }

    }
</script>

<style lang="scss" scoped>
    p{
        font-family: humanst521-1;
        color: #a4a4a4;
        font-size: 12px;
    }
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
    margin-left: 3%;
}
.userData{
    margin-top: 20px
}
.h3-title{
    margin-left: 4.5%;
}
.updatePerfilComp{

    margin-left: 13%;

}
.bar-container{
  width: 95%;
  margin-left: 3%;
  height: 0.2rem;
  display: flex;
  flex-direction: row;
  background: rgb(242,192,74);
  background: linear-gradient(90deg, rgba(242,192,74,1) 180px, rgba(179,182,188,1) 180px);
}


@media only screen and (max-width: 960px) {

}
</style>