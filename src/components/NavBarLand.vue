<template>
    <v-app-bar
      fixed
      hide-on-scroll
      color="black"
      elevate-on-scroll
      
      >

      <v-btn
          text
          color="transparent"
          disabled
          >
            <v-img src="../assets/ContenidoMain/2.png" class="img-nav">

            </v-img>
        </v-btn>
              <v-btn text @click="createItem">
              <v-icon class="mr-3" color="#FEBF2C">
                mdi-briefcase
              </v-icon>
              <a   class="title-mg1 ">TRABAJÁ CON NOSOTROS</a>
              </v-btn>

        
        <v-row no-gutters>
          <v-col offset-lg="3" offset-sm="3"  offset-md="2" offset-xl="4" md="1" xl="1"  class="col-franq mr-2">
            <div class="d-flex flex-row" style="cursor: pointer; " @click="$router.push('/MuchoGustoCompras')">
              <p class="title-mg1 mr-3 mt-5" >TIENDA</p>
            <v-icon color="#FEBF2C" class="mt-1" size="20">
              mdi-cart
            </v-icon>
            </div>

          </v-col>
          <v-col offset-lg="3" class="col-iconos">
            <v-btn text icon @click="google">
                <v-icon color="white">
                  mdi-google-maps
                </v-icon>
              </v-btn>
            <v-divider vertical color="#FFF" class="divider" inset></v-divider>
            <v-btn icon  color="white" href="https://www.instagram.com/muchogusto.info/">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-divider vertical color="#FFF" class="divider" inset></v-divider>
            <v-btn icon color="white" href="https://www.facebook.com/Mucho-Gusto-110256295138152" >
              <v-icon size="25">
                mdi-facebook
              </v-icon>
            </v-btn>
            
          </v-col>
        </v-row>
        <v-dialog v-model="dialog"  width="500" overlay-opacity="0.6" transition="4 dialog-top-transition" >
          <form ref="form" @submit.prevent="sendEmail" class="v-dialog" v-if="createItem">
            <v-row column class="mt-10">
            <v-col cols="12" >
              <v-text-field v-model="name" :counter="20" :rules="nameRules" type="text" name="from_name" label="Nombre Completo" class="v-field"></v-text-field>
            </v-col >
            <v-col cols="12" >
              <v-text-field v-model="email" :rules="emailRules" type="email" name="from_email" label="Email" class="v-field"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field  v-model="mensaje" :rules="msgRules" :counter="100" type="text" name="message" label="Mensaje" class="v-field"></v-text-field>
            </v-col>
            <v-col cols="12" class="d-flex justify-center"> 
            <v-btn type="submit" value="Send" class="v-btn-form">
              Enviar
            </v-btn>
            </v-col>     

          </v-row>
          </form>
      </v-dialog>
    </v-app-bar>
</template>

<script>
  import emailjs from '@emailjs/browser';
  export default {
    name: 'NavBar',

    data: () => ({
      dialog: false,
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Tu nombre es requerido',
        v => v.length >= 5 || 'Tu nombre no puede tener menos de 3 caracteres',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v => /.+@.+/.test(v) || 'Tu email tiene que ser valido',
      ],
      mensaje: '',
      msgRules: [
        v => !!v || 'Un mensaje es requerido',
        v => v.length >= 10 || 'Tu mensaje no puede tener menos de 10 caracteres',
       
      ],
    }),

    methods:{
      google(){
            window.open('https://goo.gl/maps/fcgcoR7e3866YiiM9', '_blank').focus();
         },
      scroll1(){
        window.scrollTo(0, 1060)
      },
      scroll2(){
        window.scrollTo(0,2000)
      },
      scroll3(){
        window.scrollTo(0,3000)
      },
      createItem() {
        
        console.log("openDialog");
        this.dialog = true;
        this.$nextTick(() => this.$refs.form.reset());
        },
        sendEmail() {
        emailjs.sendForm('service_nczqf1o', 'template_7v6t5vr', this.$refs.form, 'ac9G2kbD-jNOEsFQD')
        .then((result) => {
            console.log('SUCCESS!', result.text);
            alert('Gracias por aplicar');
            location.reload();
        }, (error) => {
            console.log('FAILED...', error.text);
        });
      }
    },
  }
</script>


<style lang="scss" scoped>
.divider{
  margin-left: 10px;
  margin-right: 10px;
}

.v-dialog{
  background-color: white;
 margin: 0;
 
  padding: 0;
  height: 500px;
 
  .v-btn-form{
    display: flex;
    justify-self: center;
    align-self: center;
    margin-left: 25px;
  };
  .v-field{
    margin-left: 40px;
    margin-right: 40px;
  }
}



.title-mg1{
  color:#FFF;
  font-family: humanst521-2;
  font-weight: lighter;
  font-size: 16px;
  margin-top: 3px;
  }
.v-imgF{
  transform: scale(0.25);

}
.v-imgBriefcase{
  transform: scale(0.35);
}
.v-imgBriefcase:hover{
  cursor: pointer;
}


.col-iconos{
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}
.col-franq{
  display: flex;
  align-items: center;
}




.title1-1{
  color: #FFF;
  font-family: humanst521-1;
  
  
  
}
.title1-2{
  color: #FFF;
  font-family: humanst521-2;
}
.title1-3{
  color:#FFF;
  font-family: humanst521-2;
}
.title1-4{
  color:#FFF;
  font-family: humanst521-2;
  font-weight: lighter;
  margin-top: 3px;
  
  
}

.title__1{
 color: #FFF;
 font-weight: 50;
 font-size: 30px;
}

.a-ref{
  text-decoration: none;
  color:#FFF
}
.a-ref:active{
  text-decoration: none;
  color: #FFF;
}
.a-ref:hover{
  text-decoration: none;
  color: #FFF;
}
.btn{
  font-size: 12px;
  font-weight: 25;
  color:#FFF
}

.img-nav{
  transform: scale(0.4);
}


.divider{
  margin-left: 10px;
  margin-right: 10px;
}




</style>
