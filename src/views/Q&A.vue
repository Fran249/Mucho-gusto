<template>
    <div>
        <navBar />
        <v-img style=" width: 100%; height: 385px; align-self: center;" src="../assets/PreguntasFrecuentes.png"></v-img>

        <div  class="d-flex flex-column justify-start mt-15 mb-15 contain-titulo" >
            <h3 class="mb-5" style="font-family: 'humanst521_btbold'; color: #000;">PREGUNTAS FRECUENTES</h3>
            <div class="bar-container">
            </div>
        </div>
        <v-container style="margin-right: 31.5%; margin-bottom: 400px;">
            <h3 class="Q">¿Tengo que registrarme para comprar? </h3>
            <p class="A"> Es necesario que te registres para comprar en muchogusto.com. Simplemente te pediremos al
                momento de comprar un mail, nombre, apellido, DNI y un teléfono para poder hacerle un correcto
                seguimiento a tu pedido. Es importante que los datos que ingreses sean verdaderos por si necesitamos
                contactarte para validar datos de tu compra. Recordá que deberás ser mayor de edad. Además, luego podrás
                ver tus pedidos desde la sección “Registro de compra”. </p>
            <h3 class="Q">¿Están protegidos mis datos personales? </h3>
            <p class="A"> Sí, cada usuario dispondrá en todo momento de los derechos de acceso a la información,
                rectificación y supresión de sus datos personales conforme a la Ley Nº 25.326 sobre protección de datos
                de carácter personal. Tus datos personales se toman solo con los fines de cumplir con el giro comercial
                de la empresa. El usuario tiene el derecho gratuito de ejercer el acceso, rectificar y suprimir sus
                datos. La Dirección Nacional de Protección de Datos Personales, órgano de control de la Ley Nro. 25.326,
                tiene la atribución de atender las denuncias y reclamos que se interpongan en relación con el
                incumplimiento de las normas sobre protección de datos personales. </p>
            <h3 class="Q">¿Es seguro comprar en muchogusto.com?</h3>
            <p class="A"> Es muy seguro comprar en farmaonline.com, contamos con altos estándares de seguridad según las
                buenas prácticas de los retails internacionales. Utilizamos servidores certificados, plataformas con
                estándares SSL (Secure Socket Layer) para realizar transacciones electrónicas seguras, lo que significa
                que toda tu información personal no podrá ser leída ni capturada por terceros mientras viaja por la red.
            </p>
            <h3 class="Q">¿Cómo hago para reclamar o cancelar un pedido?</h3>
            <p class="A"> Por cualquier reclamo o cancelación respecto de tu pedido, debés comunicarte vía WhatsApp al
                02284-577478. Todo tipo de rembolso será otorgado mediante códigos de descuento por el valor total de su
                compra para ser usado nuevamente en tu próximo pedido.
            </p>
            <h3 class="Q">Olvidé mi clave. ¿Cómo hago para obtener una nueva clave?</h3>
            <p class="A"> Si generaste una contraseña y no la recordás, podés reemplazarla por una nueva fácilmente:
            <ul>
                <li>Hacé clic en “Ingresar con mail y contraseña”</li>
                <li>Seleccioná “¿Olvidaste tu contraseña?” </li>
                <li>Ingresá tu mail. Accede al link que te enviamos. </li>
                <li>Registrá la nueva contraseña.</li>
            </ul>
            </p>
        </v-container>

        <v-btn v-if="
    !mobileViewSmall" elevation="9" fab fixed right bottom color="white">
            <v-img src="../assets/WhatsAppVerde.png" contain width="30" height="30">

            </v-img>
        </v-btn>
        <Footer />
    </div>
</template>


<script>
import navBar from '../components/navBar.vue'
import Footer from '../components/Footer.vue'
export default {
    name: 'QandA',
    components: {
        navBar,
        Footer,


    },
    data: () => ({
        mobileViewSmall: false,
    }),
    methods: {
        mobileViewFunctionSmall() {

            this.mobileViewSmall = window.innerWidth <= 500;
            console.log('mobile version')
        },

    },
}
</script>
<style lang="scss" scoped>
.Q {
    color: #374763;
    margin-bottom: 2%;
    font-family: 'humanst521_btbold';
}
.A {
    font-family: 'humanst521-1';
    color: #374763;
    margin-bottom: 2%;
}
.bar-container {
    width: 90%;
    height: 0.2rem;
    display: flex;
    flex-direction: row;
    background: rgb(242, 192, 74);
    background: linear-gradient(90deg, rgba(242, 192, 74, 1) 450px, rgba(179, 182, 188, 1) 70px);
}

.contain-titulo{
    width: 100%; 
    margin-left: 110px;

}
@media screen and (max-width: 960px ){
    .contain-titulo{
        margin-left: 10px;
    }
    .bar-container {
  
    background: linear-gradient(90deg, rgba(242, 192, 74, 1) 255px, rgba(179, 182, 188, 1) 70px);
}
}


</style>