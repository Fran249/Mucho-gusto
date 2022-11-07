<template>
    <v-footer
      color="black"
      :fixed="fixed()"
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
            <v-btn icon >
              <v-icon color="#FEBF2C">mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon >
              <v-img src="../assets/ContenidoMain/F-Amar..png" class="facebook-footer"></v-img>
            </v-btn>
          </div>
          <div class="d-flex flex-row mt-3">
            <v-btn  icon text>
              <v-img src="../assets/ContenidoMain/briefcase.png" class="briefcase"></v-img>
            </v-btn>
            <a  @click="createItem" class="title-mg1 mt-2"><strong>TRABAJÁ CON NOSOTROS</strong></a>
          </div>
        </div>
        
          <v-btn text color="transparent" class="v-btn-footer" @click="scrollTop">
            <v-img src="../assets/ContenidoMain/4.png" class="img-png"></v-img>
          </v-btn>
   
        
        <div class="columna3">
              <v-icon color="#FFBF00" class="schedule-icon mr-3">schedule</v-icon>
              
              <v-divider vertical color="#FFBF00"  class="divider1"></v-divider>
              
              
            <div class="div-container-texts1">
              <p class="div-text-1">
                TODOS LOS LOCALES
                
              </p>
              <p class="div-text-2">
                  MARTES A DOMINGO
              </p>
              <p class="div-text-3">
                DE 7:00 - 21:00
              </p>
            </div>
  
            <div class="div-container-texts2">
              <h1>
                TODOS LOS LOCALES
                
              </h1>
              <h3 >
                  MARTES A DOMINGO
              </h3>
              <h3 >
                DE 7:00 - 21:00
              </h3>
            </div>
        </div>
          <v-dialog v-model="dialog"  width="400"  hide-overlay transition="4 dialog-top-transition" >
        </v-dialog>
    </v-footer>
  
  </template>
  
  <script>
    export default {
      name: 'FootEr',
      
      data: () => ({
        
        height: '',
        dialog: false,
        valid: false,
        name: '',
        width: window.innerWidth,
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
            fixed(){
                if(window.innerWidth > 960){
                   return false
                } else if(window.innerWidth < 960){
                    return true
                }
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
        
        },

        created(){
          this.changeHeight();
        }
  
      }
  </script>
  
  <style lang="scss" scoped >
  
  .v-dialog{
    background-color: white;
    margin: 0;
    padding: 0;
    height: 350px;
   
    .v-btn-form{
      display: flex;
      justify-self: center;
      align-self: center;
      margin-left: 25px;
    }
  }
  
  
  .grid-container{
    width: 100%;
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
    margin-right: 30px;
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
    font-family: humanst521_btroman
  }
  
  .title-mg1{
      color: #fff;
      font-family: humanst521-2;
      
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