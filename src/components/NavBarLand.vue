<template>
    <v-app-bar
      fixed
      hide-on-scroll
      color="black"
      elevate-on-scroll
      
      >
          <v-row >
            <v-col cols="4" md="4"  >   
              <v-btn class="mt-2"
                    text
                    color="transparent"
                    disabled
                    >
                      <v-img src="../assets/ContenidoMain/2.png" class="img-nav">

                      </v-img>
        </v-btn>
      </v-col >
          <v-col cols="4" md="4" >    
  
            <div class="d-flex flex-row justify-center mt-2"  style="cursor: pointer; " @click="createItem">
              <v-btn text >
              <v-icon class="mr-3" color="#FEBF2C">
                mdi-briefcase
              </v-icon>
              <a   class="title-mg1 ">TRABAJÁ CON NOSOTROS</a>
              </v-btn>
               </div>

          </v-col>
          <v-col cols="4" md="4"    class="col-iconos">                    
            <v-btn icon  color="white" href="https://www.instagram.com/muchogusto.info/">
              <v-img src="../assets/Inst.2.png" contain width="25" height="25">

              </v-img>       
            </v-btn>
            <v-divider vertical color="#FFF" class="divider" inset></v-divider>
            <v-btn icon color="white" href="https://www.facebook.com/Mucho-Gusto-110256295138152" >
              <v-img src="../assets/Fce2.png" contain width="25" height="25">

              </v-img>
            </v-btn>
            
          </v-col>
        </v-row>
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
                <p style="color:white " class="mt-4 p-v-btn" >
                    ENVIAR
                </p>
            </v-btn>
            </v-col>     

          </v-row>
          </form>
        </div>
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
 
  .v-btn-form{
    display: flex;
    justify-self: center;
    align-self: center;
    margin-left: 25px;
  };

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
  justify-items: center;
}




.title1-1{
  color: #FFF;
  font-family: 'humanst521-1';
  
  
  
}
.title1-2{
  color: #FFF;
  font-family: 'humanst521-2';
}
.title1-3{
  color:#FFF;
  font-family: 'humanst521-2';
}
.title1-4{
  color:#FFF;
  font-family: 'humanst521-2';
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
