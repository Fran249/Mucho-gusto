<template>
  <v-footer
    color="black"
    :height="height"
    class="grid-container">
  
      <div class="columna1">
        <div class="mg-container">
          <v-btn text disabled class="v-btn-mg">
            <v-img src="../assets/ContenidoMain/12.png" class="v-img-title-mg">
            </v-img>
          </v-btn>
        </div>
        <div>
          <v-btn icon href='https://www.instagram.com/muchogusto.info/'>
            <v-img src="../assets/Inst..png" contain width="25" height="20"></v-img>
          </v-btn>
          <v-btn icon href="https://www.facebook.com/Mucho-Gusto-110256295138152" >
              <v-img src="../assets/Fce.png" contain width="25" height="20"></v-img>
          </v-btn>
          <v-btn icon
      v-if="
          !mobileViewSmall"
        color="transparent"
    >
    <v-img src="../assets/WhatsAppAmarillo.png" contain width="25" height="20" >

    </v-img>
  </v-btn>
          <v-btn icon @click="google" style="width: 25px; height: 20px;">
                <v-icon color="#FFBF00" >
                  mdi-google-maps
                </v-icon>
              </v-btn>
        </div>
        <div class="d-flex flex-row mt-3">
          <v-btn  icon text>
            <v-icon color="#FEBF2C">
              mdi-briefcase
            </v-icon>
          </v-btn>
          <a  @click="createItem" class="title-mg1 mt-2"><strong>TRABAJÁ CON NOSOTROS</strong></a>
        </div>
      </div>
      
        <v-btn text color="transparent" class="v-btn-footer" @click="scrollTop">
          <v-img src="../assets/ContenidoMain/4.png" class="img-png"></v-img>
        </v-btn>
 
      
      <div class="columna3">
            <v-icon color="#FFBF00" class="schedule-icon mr-3">schedule</v-icon>            
          <div class="div-container-texts1">
            <p class="div-text-2 mt-5">
                MARTES A DOMINGO
            </p>
            <p class="div-text-3">
              DE 7:00 - 21:00
            </p>
          </div>

          <div class="div-container-texts2">
            <h3 >
                MARTES A DOMINGO
            </h3>
            <h3 >
              DE 7:00 - 21:00
            </h3>
          </div>
      </div>
      <v-dialog v-model="dialog"  width="500" overlay-opacity="0.6" transition="4 dialog-top-transition" >
          <div class="v-dialog">
    
            <div style="width: 100%; height: 50px; margin-top: 0;" class="d-flex flex-column align-start">
          <h1 class="mb-5"><strong>¡TE INVITAMOS A SUMARTE A MUCHO GUSTO!</strong></h1>
        <h3 class="mb-0">Sólo completa el formulario y nos pondremos en contacto.</h3>
      </div>
          <form ref="form" @submit.prevent="sendEmail" class="form" v-if="createItem">
            <v-row column class="mt-10">
            <v-col cols="12" >
              <v-text-field v-model="name" append-icon="mdi-account" :counter="20" :rules="nameRules" type="text" name="from_name" label="Nombre Completo" class="v-field"></v-text-field>
            </v-col >
            <v-col cols="12" >
              <v-text-field v-model="email" append-icon="mdi-email" :rules="emailRules" type="email" name="from_email" label="Email" class="v-field"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field  v-model="mensaje" append-icon="mdi-pencil" :rules="msgRules" :counter="100" type="text" name="message" label="Mensaje" class="v-field"></v-text-field>
            </v-col>
            <v-col cols="12" class="d-flex justify-center"> 
              <v-btn width="70%" type="submit"  color="#febf2c">
                <p style="color:white " class=" p-v-btn" >
                    ENVIAR
                </p>
            </v-btn>
            </v-col>     

          </v-row>
          </form>
        </div>
      </v-dialog>
  </v-footer>

</template>

<script>
  import emailjs from '@emailjs/browser';
  export default {
    name: 'FootEr',
    
    data: () => ({
      mobileViewSmall: false,
      height: '',
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
        mobileViewFunctionSmall(){
        
        this.mobileViewSmall = window.innerWidth <= 500;
        console.log('mobile version')
    },
        changeHeight(){

          if( window.innerWidth <= 960){
          this.height = '100';} 
          else if( window.innerWidth >= 960){
            this.height = '250'
          }
          
          
        },
     

        scrollTop(){
          window.scrollTo(0, 0)
        },

        createItem() {
        this.cancel();
        this.dialog = true;
        },
        cancel() {
            this.dialog = false;
            this.$nextTick(() => {
            if (this.$refs['form']) {
            this.$refs.form.reset();
          }
        });
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
      created(){
        this.changeHeight();
        this.mobileViewFunctionSmall();
      }

    }
</script>

<style lang="scss" scoped >

.v-dialog{
        background-color: #fff;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 50px;
    }
    .form{
        gap: 15px;
        .v-btn-cont{
            background-color: black;
        }
    }
.form{
  background-color: white;
 margin: 0;
 
  padding: 0;
  height: 300px;
}

h1{
    font-family: 'humanst521_btbold';
    font-size: 20px;
    font-weight: bolder;
    color: #374763;
}
h3{
    font-family: 'humanst521-1';
    font-size: 13px;
    color: #374763;
}

.title-mg1{
  color:#FFF;
  font-family: 'humanst521-1';
  font-weight: bolder;
  font-size: 16px;
  margin-top: 3px;
  }
.grid-container{
  display: grid;
  grid-template-columns: repeat(3, 33.3%);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  overflow-y: hidden;
  overflow-x: hidden;
  padding: 0px;
  
  
}

.columna1{
  grid-row: 1;
  grid-column: 1/2;
  display: flex;
  flex-direction: column;
  margin-left: 25px
  
}

.v-btn-footer{
  
  grid-row:1/2;
  grid-column:2/3;
  transform: scale( 0.1);
  .img-png{
    transform: scale( 1.7);
  }
  
}
.columna3{
  grid-row: 1;
  grid-column:3/4;
  display: flex;
  justify-content: right;
  margin-right: 50px;
}

.mg-container{
 display: flex;
 margin-bottom: 25px;
 margin-left: 10px;
  .v-btn-mg{
    
    width: 50px;

  .v-img-title-mg{
  transform: scale(0.4);

    }

  }
}
.facebook-footer{
  transform: scale(0.33);
}
.briefcase{
  transform: scale(0.35);
}




a{
  text-decoration: none;
}



.div-container-texts2{
  display: none;
}


.schedule-icon{
  font-size: 75px;
}
.divider1{
  margin-right: 20px;
}
.div-text-1{
  color:#fff;
  font-family: humanst521-2;
}
.div-text-2,.div-text-3{
  color:#fff;
  font-family: humanst521_btroman;
  font-size: 18.5px;
  margin-bottom: 0;
}
.v-application p {
  margin-bottom: 0;
}

.title-mg1{
    color: #fff;
    font-family: humanst521-2;
    
  }
.div-container-texts1{
  margin-bottom: 12px;
}


    @media only screen and (max-width: 960px){

      .columna1{
        display: none;
      }
      .v-btn-footer{
  
        grid-row:1/2;
        grid-column:1/2;
        transform: scale( 0.09);
        .img-png{
          transform: scale( 0.9);
        }
  
        }
        .schedule-icon{
        font-size: 30px;
      }
      .divider1{
        margin-right: 10px;
        
      }
      .columna3{
        margin-top: 10px;
      }
      .div-container-texts1{
        display: none;
      }
      .div-container-texts2{
        display: flex;
        flex-direction: column;
         h3 {
          color:#fff;
        font-family: humanst521_btroman;
        font-size: 6.5px
        }
        h1{
          color:#fff;
          font-family: humanst521-2;
          font-size: 6.5px
        }
      }

    }
</style>