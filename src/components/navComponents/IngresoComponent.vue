<template>
    <div >
        <div class="v-dialog" v-if="ingreso == true">
        <h1 class="mb-5"><strong>¡BIENVENIDO A MUCHO GUSTO!</strong></h1>
        <h3 class="mb-10">¡Seleccioná los productos que queres y te lo llevamos!</h3>
      <form @submit.prevent="ingresoUsuario({email:email, password:pass})" class="form">
          <v-text-field
              type="email"
              placeholder="E-mail"
              v-model="email"
              filled
              full-width
              append-icon="mdi-email"
              class="email"
              color="grey"
          ></v-text-field>
          <v-text-field
              placeholder="Contraseña"
              v-model="pass"
              filled
              color="grey"
              class="password"
              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (value = !value)"
              :type="value ? 'password' : 'text'"
          ></v-text-field>
            <a @click="ingreso = false" class="d-flex justify-end"><p>¿Olvidaste tu contraseña?</p></a>
     
            <v-btn width="70%" type="submit" class="ml-15" color="#febf2c">
                <p class="mt-4 p-v-btn" >
                    ACCEDER
                </p>
            </v-btn>
      </form>
      <p>{{error}}</p>
    </div>
    <div class="v-dialog" v-if="ingreso == false">
            <v-btn icon color="grey" width="100" tile class="mb-10" @click="ingreso = true">
                <v-icon>
                    mdi-arrow-left-thick
                </v-icon>
                <h3 class="mr-5 volver-btn">
                Volver
            </h3>
            </v-btn>
        <h1 class="mb-5"><strong>INGRESA TU EMAIL</strong></h1>
        <form @submit.prevent="reEstablecerContraseña(email)" class="form">
          <v-text-field
              type="email"
              placeholder="E-mail"
              v-model="email"
              filled
              full-width
              append-icon="mdi-email"
              class="email"
              color="grey"
          ></v-text-field>
           <div>
            <p class="resetPass text-center" v-if="sendEmail">
                <v-icon color="green">
                    mdi-check
                </v-icon>  Enviamos un email a {{this.email}} para reestablecer tu contraseña
            </p>
           </div>
            <v-btn 
            width="70%" 
            type="submit" 
            class="ml-15" 
            color="#febf2c" 

            >
                <p class="mt-4 p-v-btn" >
                    REESTABLECER CONTRASEÑA
                </p>
            </v-btn>
        </form>
      </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
const auth = getAuth();
export default {
  name: "IngresoComponent",
  data() {
      return {
            ingreso: true,
            sendEmail: false,
            email: '',
            pass: '',
            value: String,
      }
  },
  methods:{


        widthFunction(){

            if(window.innerWidth > 960){
                return '70%'
            } else if(window.innerWidth < 960){
                return '100%'
            }

        },


      ...mapActions(['ingresoUsuario']),

      reEstablecerContraseña(){
        sendPasswordResetEmail(auth, this.email)
        .then(() => {
          // Password reset email sent!
          // ..
          this.email= ''
          setTimeout(this.sendEmail = true, 1300)


        })
        .catch((error) => {
          console.log(error)
          // ..
        });
      },
      
  },
  computed:{
      ...mapState(['error'])
  },
  watch: {
      
    },
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
a, a:hover, a:focus, a:visited{
text-decoration: none;
color: grey;
font-family: humanst521-1;
font-size: 18px;
}
.p-v-btn{
    font-family: 'humanst521_btbold';
    color: #fff
}
.resetPass{
    font-family: 'humanst521_btbold';
    color: green;
}
h1{
    font-family: 'humanst521_btbold';
    font-size: 20px;
    font-weight: bold;
    color: #374763;
}
h3{
    font-family: humanst521-1;
    font-size: 13px;
    color: #374763;
}

.v-btn {
  text-transform:none !important;
  
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
    .email{
        width: 100%;
    }
    .password{
        width: 100%;
    }


@media only screen and (max-width: 960px){

    

}
</style>