<template>
  <div id="template">
    <v-container v-if="width >= 960">
      <div class="mb-10">
        <h3 class="mi-compra mb-2">MI COMPRA</h3>
        <div class="bar-container"></div>
      </div>

      <v-row>
        <v-col cols="7">
          <div class="d-flex flex-row">
            <router-link to="/" style="text-decoration: none" class="mb-5">
              <v-btn text>
                <v-icon color="#374763" size="25" class="mb-1">
                  arrow_back_ios
                </v-icon>
                <h3 class="h3-btn">SEGUIR COMPRANDO</h3>
              </v-btn>
            </router-link>
          </div>
          <v-list width="100%" v-for="carr in carrito" :key="carr.title">
            <v-list-item>
              <div class="img-container">
                <v-img :src="carr.src" width="100%" height="100"></v-img>
              </div>
              <div class="d-flex flex-column justify-center">
                <h3 class="h3-prod ml-2">{{ carr.title }}</h3>

                <div class="d-flex flex-row">
                  <div class="d-flex flex-row justify-center ml-3 mt-10">
                    <v-btn
                      tile
                      icon
                      @click="disminuir(carr)"
                      outlined
                      color="#02265c"
                      width="30"
                      height="30"
                      style="
                        border-radius: 10px;
                        border-top-right-radius: 1px;
                        border-bottom-right-radius: 1px;
                      "
                    >
                      <v-icon size="15px"> mdi-minus </v-icon>
                    </v-btn>
                    <div class="text-center pa-1 card-value">
                      <p class="number-value">{{ Number(carr.value) }}</p>
                    </div>
                    <v-btn
                      tile
                      icon
                      @click="aumentar(carr)"
                      outlined
                      color="#02265c"
                      width="30"
                      height="30"
                      style="
                        border-radius: 10px;
                        border-top-left-radius: 1px;
                        border-bottom-left-radius: 1px;
                      "
                    >
                      <v-icon size="15px"> mdi-plus </v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
              <div class="d-flex flex-column align-self-start delete-art">
                <v-btn icon @click="borrarArticuloCarrito(carr)" class="ml-10">
                  <v-icon color="#b3b6bc"> mdi-close </v-icon>
                </v-btn>
                <p
                  class="precio-value ml-5 mt-10"
                  v-if="activarDescuento && tipo == 'porcentaje'"
                >
                  ${{
                    Number(
                      carr.precio - Math.round(carr.precio * percentDesc)
                    ) * Number(carr.value)
                  }}
                </p>
                <p
                  class="precio-value ml-5 mt-10"
                  v-if="activarDescuento && tipo == 'neto'"
                >
                  ${{ Number(carr.precio * carr.value) - Number(descuento) }}
                </p>
                <p
                  class="precio-value ml-5 mt-10"
                  v-if="activarDescuento == false && tipo == ''"
                >
                  ${{ Number(carr.precio) * Number(carr.value) }}
                </p>
              </div>
            </v-list-item>
            <v-divider></v-divider>
          </v-list>
          <v-divider class="mt-5"></v-divider>
        </v-col>
        <v-col cols="5">
          <v-row>
            <v-col cols="12">
              <h3 class="h3-resumen mt-5 mb-5">RESUMEN DE CUENTA</h3>
              <h3 class="mt-5 mb-5">{{ this.carrito.length }} Artículos</h3>
              <div class="d-flex flex-row mt-5 mb-5">
                <v-icon color="#374763" class="mr-2">
                  mdi-ticket-confirmation
                </v-icon>
                <h3 class="h3-promo">¿Tienes un código de promoción?</h3>
              </div>
              <div>
                <v-text-field
                  v-model="ticket"
                  color="grey"
                  label="Codigo"
                  append-icon="mdi-ticket-confirmation"
                  filled
                >
                </v-text-field>
                <v-btn
                  v-if="checkValue == true"
                  width="90%"
                  class="mb-10 pa-5"
                  color="#febf2c"
                  @click="checkFirebaseDesc()"
                >
                  <p class="mt-4 p-v-btn">CONFIRMAR DESCUENTO</p>
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <v-divider class="mb-5"></v-divider>
          <v-row>
            <v-col cols="6">
              <div>
                <h3 class="h3-sub-desc-total">SUBTOTAL:</h3>
              </div>
              <div>
                <h3 class="mt-15 h3-sub-desc-total">DESCUENTO:</h3>
              </div>
            </v-col>
            <v-col cols="6">
              <div>
                <h3 class="ml-15 h3-sub-desc-total">${{ precioTotalArray }}</h3>
              </div>
              <div>
                <h3
                  class="ml-15 mt-15 h3-sub-desc-total"
                  v-if="tipo == 'porcentaje'"
                >
                  ${{ descuento }}
                </h3>
                <h3 class="ml-15 mt-15 h3-sub-desc-total" v-if="tipo == 'neto'">
                  ${{ descuento * carrito.length }}
                </h3>
              </div>
            </v-col>
          </v-row>
          <v-divider class="mb-5 mt-5"></v-divider>
          <v-row>
            <v-col cols="6">
              <h3 class="h3-resumen">TOTAL:</h3>
            </v-col>
            <v-col cols="6">
              <h3 class="ml-15 h3-resumen" v-if="tipo == 'porcentaje'">
                ${{ Number(precioTotalArray - Math.round(descuento)) }}
              </h3>
              <h3 class="ml-15 h3-resumen" v-if="tipo == 'neto'">
                ${{
                  Number(
                    precioTotalArray - Math.round(descuento * carrito.length)
                  )
                }}
              </h3>
              <h3 class="ml-15 h3-resumen" v-if="tipo == ''">
                ${{ Number(precioTotalArray) }}
              </h3>
            </v-col>
            <v-btn
              @click="comprarPrimerPaso(carrito)"
              width="90%"
              class="mb-10 pa-5"
              color="#febf2c"
            >
              <p class="mt-4 p-v-btn">INICIAR MI COMPRA</p>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else class="container-mobile">
      <div class="mb-10">
        <h3 class="mi-compra mb-2">MI COMPRA</h3>
        <div class="bar-container"></div>
      </div>

      <v-row>
        <v-col cols="12">
          <div class="d-flex flex-row">
            <router-link to="/" style="text-decoration: none" class="mb-5">
              <v-btn text>
                <v-icon color="#374763" size="25" class="mb-1">
                  arrow_back_ios
                </v-icon>
                <h3 class="h3-btn">SEGUIR COMPRANDO</h3>
              </v-btn>
            </router-link>
          </div>
          <v-list width="100%" v-for="carr in carrito" :key="carr.title">
            <v-list-item>
              <div class="img-container">
                <v-img :src="carr.src" width="100%" height="100"></v-img>
              </div>
              <div class="d-flex flex-column justify-center">
                <h3 class="h3-prod ml-2">{{ carr.title }}</h3>

                <div class="d-flex flex-row">
                  <div class="d-flex flex-row justify-center ml-3 mt-10">
                    <v-btn
                      tile
                      icon
                      @click="disminuir(carr)"
                      outlined
                      color="#02265c"
                      width="30"
                      height="30"
                      style="
                        border-radius: 10px;
                        border-top-right-radius: 1px;
                        border-bottom-right-radius: 1px;
                      "
                    >
                      <v-icon size="15px"> mdi-minus </v-icon>
                    </v-btn>
                    <div class="text-center pa-1 card-value">
                      <p class="number-value">{{ Number(carr.value) }}</p>
                    </div>
                    <v-btn
                      tile
                      icon
                      @click="aumentar(carr)"
                      outlined
                      color="#02265c"
                      width="30"
                      height="30"
                      style="
                        border-radius: 10px;
                        border-top-left-radius: 1px;
                        border-bottom-left-radius: 1px;
                      "
                    >
                      <v-icon size="15px"> mdi-plus </v-icon>
                    </v-btn>
                  </div>
                  <div class="d-flex flex-column align-self-start delete-art">
                    <v-btn
                      icon
                      @click="borrarArticuloCarrito(carr)"
                      class="ml-10"
                    >
                      <v-icon color="#b3b6bc"> mdi-close </v-icon>
                    </v-btn>
                    <p class="precio-value ml-5 mt-10" v-if="carr.value == 1">
                      ${{ carr.precio }}
                    </p>
                    <p
                      class="precio-value ml-5 mt-10"
                      v-if="activarDescuento && tipo == 'porcentaje'"
                    >
                      ${{
                        Number(
                          carr.precio - Math.round(carr.precio * percentDesc)
                        ) * Number(carr.value)
                      }}
                    </p>
                    <p
                      class="precio-value ml-5 mt-10"
                      v-if="activarDescuento && tipo == 'neto'"
                    >
                      ${{
                        Number(carr.precio * carr.value) - Number(descuento)
                      }}
                    </p>
                    <p class="precio-value ml-5 mt-10" v-else>
                      ${{ Number(carr.precio) * Number(carr.value) }}
                    </p>
                  </div>
                </div>
              </div>
            </v-list-item>
            <v-divider></v-divider>
          </v-list>
          <v-divider class="mt-5"></v-divider>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <h3 class="h3-resumen mt-5 mb-5">RESUMEN DE CUENTA</h3>
              <h3 class="mt-5 mb-5">{{ this.carrito.length }} Artículos</h3>
              <div class="d-flex flex-row mt-5 mb-5">
                <v-icon color="#374763" class="mr-2">
                  mdi-ticket-confirmation
                </v-icon>
                <h3 class="h3-promo">¿Tienes un código de promoción?</h3>
              </div>
              <div>
                <v-text-field
                  v-model="ticket"
                  color="grey"
                  label="Codigo"
                  append-icon="mdi-ticket-confirmation"
                  filled
                >
                </v-text-field>
                <v-btn
                  v-if="checkValue == true"
                  width="90%"
                  class="mb-10 pa-5"
                  color="#febf2c"
                  @click="checkFirebaseDesc()"
                >
                  <p class="mt-4 p-v-btn">CONFIRMAR DESCUENTO</p>
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <v-divider class="mb-5"></v-divider>
          <v-row>
            <v-col cols="6">
              <div>
                <h3 class="h3-sub-desc-total">SUBTOTAL:</h3>
              </div>
              <div>
                <h3 class="mt-15 h3-sub-desc-total">DESCUENTO:</h3>
              </div>
            </v-col>
            <v-col cols="6">
              <div>
                <h3 class="ml-15 h3-sub-desc-total">${{ precioTotalArray }}</h3>
              </div>
              <div>
                <h3 class="ml-15 mt-15 h3-sub-desc-total">
                  ${{ Math.round(descuento) }}
                </h3>
              </div>
            </v-col>
          </v-row>
          <v-divider class="mb-5 mt-5"></v-divider>
          <v-row>
            <v-col cols="6">
              <h3 class="h3-resumen">TOTAL:</h3>
            </v-col>
            <v-col cols="6">
              <h3 class="ml-15 h3-resumen">
                ${{ Number(precioTotalArray - Math.round(descuento)) }}
              </h3>
            </v-col>
            <v-btn
              @click="comprarPrimerPaso()"
              width="90%"
              class="mb-10 pa-5"
              color="#febf2c"
            >
              <p class="mt-4 p-v-btn">INICIAR MI COMPRA</p>
            </v-btn>
            <div id="button-checkout"></div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog width="650" v-model="popUp" persistent>
      <v-card style="padding: 50px; border-radius: 10px">
        <div class="text-left d-flex flex-column justify-start">
          <h3
            style="
              margin-bottom: 20px;
              margin-right: 5%;
              color: #374763;
              font-family: 'humanst521-2';
            "
          >
            ¡SÓLO UN PASO MÁS!
          </h3>
          <p
            style="font-size: 20px; font-family: 'humanst521-1'; color: #374763"
          >
            Te solicitamos unos datos más para comenzar con tus compras.
          </p>
          <p style="font-family: 'humanst521-1'; color: gray">
            ¿Por qué solicitamos estos datos?
          </p>
          <p style="font-family: 'humanst521-1'; color: gray">
            Tus datos personales se toman sólo con los fines de cumplir con el
            giro comercial de la empresa y hacer un correcto seguimiento a tu
            pedido. Es importante que los datos que ingreses sean verdaderos por
            si necesitamos contactarte para validar datos de tu compra. Recordá
            que deberás ser mayor de edad. Cada usuario dispondrá en todo
            momento de los derechos de acceso a la información, rectificación y
            supresión de sus datos personales conforme a la Ley Nº 25.326 sobre
            protección de datos de carácter personal. El usuario tiene el
            derecho gratuito de ejercer el acceso, rectificar y suprimir sus
            datos. La Dirección Nacional de Protección de Datos Personales,
            órgano de control de la Ley Nro. 25.326, tiene la atribución de
            atender las denuncias y reclamos que se interpongan en relación con
            el incumplimiento de las normas sobre protección de datos
            personales.
          </p>
          <v-btn
            style="margin-top: 75px; width: 50%; align-self: center"
            @click="$router.push('/userView')"
            width="90%"
            class="mb-10 pa-5"
            color="#febf2c"
          >
            <p class="mt-4 p-v-btn">COMPLETAR REGISTRO</p>
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <div
      style="width: 100%; text-align: start; margin: 10px"
      class="d-flex flex-row justify-center align-center"
    >
      <p class="textsmall">
        ¿Cómo hago para reclamar o cancelar un pedido? Para gestionar tu
        solicitud de arrepentimiento o por cualquier reclamo respecto de tu
        pedido, debes comunicarte vía WhatsApp al 02284-577478. Todo tipo de
        rembolso será otorgado mediante códigos de descuento por el valor total
        de su compra para ser usado nuevamente en tu próximo pedido. Al
        continuar con la compra usted constata haber leído y aceptado los
        términos y condiciones mencionadas anteriormente.
      </p>
    </div>
    <v-dialog v-model="loadPrueba">
      <div style="width: 100%; height: 100%; display: grid; place-items: center">
        <div class="card">
  <div class="card__content">
    
    <div class="card__front">

    </div> 
    
    <div class="card__back">

    </div>
    
  </div>
</div>
      </div>
    </v-dialog>

  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, onSnapshot, doc, deleteDoc } from "firebase/firestore";
//
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/index";

import store from "@/store";
import router from "@/router";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// eslint-disable-next-line no-undef, no-unused-vars
const mercadopago = new MercadoPago(
  "APP_USR-5b1c8b38-3817-4122-8a38-b3aa9c101518",
  {
    locale: "es-AR", // The most common are: 'pt-BR', 'es-AR' and 'en-US'
  }
);

const auth = getAuth();
export default {
  name: "confirmBuy",

  data: () => ({
    valorDescuento: store.state.valorDescuento,
    precioTotalArray: [],
    carrito: store.state.carritoCompras,
    descuento: 0,
    totalCard: [],
    width: window.innerWidth,
    name: "",
    email: "",
    numberPhone: "",
    numberDNI: "",
    streetName: "",
    checkValue: false,
    valorTotalDesc: "",
    percentDesc: 1,
    activarDescuento: false,
    tipo: "",
    popUp: false,
    dialogLoading: false,
    loadPrueba: true
  }),

  methods: {
    aumentar(carr) {
      const index = this.carrito.findIndex((object) => {
        return object.id === carr.id;
      });
      let dataStorage = JSON.parse(
        localStorage.getItem(`cart/${auth.currentUser.uid}`)
      );

      dataStorage[index].value = Number(dataStorage[index].value + 1);
      localStorage.setItem(
        `cart/${auth.currentUser.uid}`,
        JSON.stringify(dataStorage)
      );
      this.carrito[index].value = Number(this.carrito[index].value) + 1;

      var subTotales = [];

      this.carrito.forEach((element) => {
        subTotales.push(Number(element.value) * Number(element.precio));
      });
      var sumaTotal = subTotales.reduce((prev, curr) => prev + curr, 0);
      this.precioTotalArray = sumaTotal;
    },
    disminuir(carr) {
      const index = this.carrito.findIndex((object) => {
        return object.id === carr.id;
      });
      let dataStorage = JSON.parse(
        localStorage.getItem(`cart/${auth.currentUser.uid}`)
      );

      if (dataStorage[index].value >= 2) {
        dataStorage[index].value = Number(dataStorage[index].value - 1);
        localStorage.setItem(
          `cart/${auth.currentUser.uid}`,
          JSON.stringify(dataStorage)
        );
        this.carrito[index].value = Number(this.carrito[index].value) - 1;

        var subTotales = [];

        this.carrito.forEach((element) => {
          subTotales.push(Number(element.value) * Number(element.precio));
        });
        var sumaTotal = subTotales.reduce((prev, curr) => prev + curr, 0);
        this.precioTotalArray = sumaTotal;
      }
    },
    borrarArticuloCarrito(carr) {
      const index = this.carrito.findIndex((object) => {
        return object.id === carr.id;
      });

      var dataStorage = JSON.parse(
        localStorage.getItem(`cart/${auth.currentUser.uid}`)
      );
      var dataItem = dataStorage[index];

      dataStorage.splice(dataStorage.indexOf(dataItem), 1);

      localStorage.setItem(
        `cart/${auth.currentUser.uid}`,
        JSON.stringify(dataStorage)
      );

      var indexof = this.carrito.indexOf(carr);
      this.carrito.splice(indexof, 1);
      if (this.carrito.length == 0) {
        store.commit("toggleCarrito", false);
      }

      store.commit("sendNotif", this.carrito.length);
    },

    comprarPrimerPaso() {
      this.dialogLoading = true;
      if (auth.currentUser != null) {
        onSnapshot(doc(db, `Usuarios/${auth.currentUser.uid}`), (doc) => {
          if (
            doc.data().nombreCompleto == "" ||
            doc.data().email == "" ||
            doc.data().dni == "" ||
            doc.data().telefonoContacto == "" ||
            doc.data().direccion == ""
          ) {
            this.popUp = true;
          } else {
            this.popUp = false;
            this.compraPrimerPasoDos();
          }
        });
      }
    },
    compraPrimerPasoDos() {
      const items = [];
      onSnapshot(doc(db, `/Usuarios/${auth.currentUser.uid}/`), (doc) => {
        this.name = doc.data().nombreCompleto;
        this.email = auth.currentUser.email;
        this.numberPhone = doc.data().telefonoContacto;
        this.numberDNI = doc.data().dni;
        this.streetName = doc.data().direccion;
      });
      let dataStorage = JSON.parse(
        localStorage.getItem(`cart/${auth.currentUser.uid}`)
      );
      console.log(dataStorage);
      this.carrito.forEach((element) => {
        if (this.tipo == "porcentaje") {
          const articulos = {
            picture_url: element.src,
            quantity: element.value,
            description: element.descripcion,
            unit_price: Number(
              element.precio - Math.round(element.precio * this.percentDesc)
            ),
            title: element.title,
          };
          items.push(articulos);
        } else if (this.tipo == "neto") {
          let Y = element.precio * element.value;
          let X = this.descuento;
          const articulos = {
            picture_url: element.src,
            quantity: element.value,
            description: element.descripcion,
            unit_price: Number(element.precio - element.precio * (X / Y)),
            title: element.title,
          };
          items.push(articulos);
        } else {
          const articulos = {
            picture_url: element.src,
            quantity: element.value,
            description: element.descripcion,
            unit_price: element.precio,
            title: element.title,
          };
          items.push(articulos);
        }
      });

      const orderData = {
        items: items,

        metadata: {
          userUID: auth.currentUser.uid,
          nombre: this.name,
          numberPhone: this.numberPhone,
          numberDNI: this.numberDNI,
          direccion: this.streetName,
          email: this.email,
        },
      };
      console.log(items);
      console.log(orderData);
      // eslint-disable-next-line no-unused-vars
      const AccessToken = process.env.VUE_APP_ACCESS_TOKEN;
      fetch(
        "https://us-central1-prueba-auth-vuex-router.cloudfunctions.net/mpActions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (preference) {
          const mp = mercadopago.checkout({
            preference: {
              id: preference.id,
            },
          });
          mp.open();
        });

      //Clear al Local Storage, para cerrar la compra y proceder al pago
      if (this.valorTotalDesc != "") {
        deleteDoc(doc(db, "codigos", `${this.valorTotalDesc}`));
      } else {
        return;
      }
      localStorage.clear();
    },

    checkFirebaseDesc() {
      onSnapshot(doc(db, `/codigos/${this.valorTotalDesc}/`), (doc) => {
        this.percentDesc = doc.data().descuento;
        this.tipo = doc.data().tipo;
      });
      this.activarDescuento = true;
    },
  },
  beforeCreate() {
    onAuthStateChanged(auth, (user) => {
      this.usuario = auth.currentUser.uid;
      if (user) {
        let datosLocalStorage = JSON.parse(
          localStorage.getItem(`cart/${auth.currentUser.uid}`)
        );
        if (datosLocalStorage === null) {
          this.carrito = [];
        } else {
          this.carrito = datosLocalStorage;
          store.commit("sendNotif", this.carrito.length);
        }
      } else {
        // User is signed out
        // ...
      }
    });
  },
  mounted() {
    onSnapshot(doc(db, `/Usuarios/${auth.currentUser.uid}/`), (doc) => {
      this.name = doc.data().nombreCompleto;
      this.email = auth.currentUser.email;
      this.numberPhone = doc.data().telefonoContacto;
      this.numberDNI = doc.data().dni;
      this.streetName = doc.data().direccion;
    });
  },
  watch: {
    dialogLoading() {
      if (this.dialogLoading == true) {
        setTimeout(() => {
          this.dialogLoading = false;
        }, 2500);
      }
    },
    carrito() {
      var subTotales = [];

      this.carrito.forEach((element) => {
        subTotales.push(
          Number(element.value) * Number(element.precio * this.percentDesc)
        );
      });
      var sumaTotal = subTotales.reduce((prev, curr) => prev + curr, 0);
      this.precioTotalArray = sumaTotal;
      store.commit("carritoCompras", this.carrito);
      console.log(store.state.carritoCompras);
      this.carrito = store.state.carritoCompras;
      if (this.carrito.length <= 0) {
        router.push("/");
      } else {
        return;
      }
    },
    percentDesc() {
      const subTotales = [];
      console.log(this.percentDesc);
      this.carrito.forEach((element) => {
        subTotales.push(Number(element.value) * Number(element.precio));
      });
      let sumaTotal = subTotales.reduce((prev, curr) => prev + curr, 0);
      if (this.tipo == "porcentaje") {
        let resultadoFinal = sumaTotal * this.percentDesc;
        this.descuento = resultadoFinal;
        console.log(this.descuento);
      } else if (this.tipo == "neto") {
        let length = this.carrito.length;
        this.descuento = this.percentDesc / length;
        console.log(" este es el descuento ", this.descuento);
      }
    },
  },
  computed: {
    ...mapState(["usuario"]),
    ...mapGetters(["existeUsuario"]),
    carritoCompra: {
      get() {
        return store.state.carrito;
      },
      set(value) {
        store.commit("toggleCarrito", value);
      },
    },
    ticket: {
      get() {
        return "";
      },
      set(value) {
        const valor = value.toString().length;

        if (valor > 6) {
          this.checkValue = false;
        } else if (valor < 6) {
          this.checkValue = false;
        } else if (valor == 6) {
          this.checkValue = true;
        }
        this.valorTotalDesc = value;
      },
    },
  },
};
</script>

<style lang="scss" scoped>


:root {
  --level-one: translateZ(3rem);
  --level-two: translateZ(6rem);
  --level-three: translateZ(9rem);
  
  --fw-normal: 400;
  --fw-bold: 700;
  
  --clr: #b7c9e5;
}

 *::before, *::after {
  box-sizing: border-box;
  margin: 0;
}

body {
  height: 100vh;
  display: grid;
  place-items: center;
  font-family: 'Oswald', sans-serif;
}

.card {
  width: 400px;
  transition: 1.5s;
}

.card__content {
  text-align: center;
  position: relative;
  padding: 15em 5em;
  transition: transform 3s;
  // background: pink;
  transform-style: preserve-3d;
}

 .card__content {
  animation: animation1 ease-in-out  infinite 3.5s;
}
 .card__front::before {
  animation: animation2  infinite 3.5s;

  
}

@keyframes animation1 {
  0%{
    transform: rotateY(0);

  }
  50%{
    transform: rotateY(.5turn);
  }
  100%{
    transform: rotateY(1turn);

  }
}
@keyframes animation2 {
  0%{
    backface-visibility: visible;
  }
  100%{
    backface-visibility: hidden;
  }
}
.card__front,
.card__back {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 5em 3em;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  display: grid;
  align-content: center;
  
  
}



.card__front::before {
  content: '';
  background-image: url(../assets/ContenidoMain/2.png);
  background-position: center;
  position: absolute;
  --spacer: 1em;
  top: var(--spacer);
  bottom: var(--spacer);
  left: var(--spacer);
  right: var(--spacer);

  transform: var(--level-one);
  
}
.card__back::after {
  content: '';
  background-image: url(../assets/Pan.png);
  backface-visibility: hidden;
  background-size: 50% 46%;
  background-position: center;
  position: absolute;
  --spacer: 1em;
  top: var(--spacer);
  bottom: var(--spacer);
  left: var(--spacer);
  right: var(--spacer);

  transform: var(--level-one);
  
}





.card__back {
  transform: rotateY(.5turn);
  color: var(--clr);
  
}

.textsmall {
  font-family: humanst521-1;
  color: #a4a4a4;
  font-size: 12px;
}
@font-face {
  font-family: humanst521-1;
  src: url("/src/assets/Humanst521LtBTLight.ttf");
}
@font-face {
  font-family: humanst521-2;
  src: url("/src/assets/Humanst521 BT Bold.ttf");
}
@font-face {
  font-family: humans521-3;
  src: url("/src/assets/Hum521Rm.ttf");
}
@font-face {
  font-family: "humanst521_btroman";
  src: url("/src/assets/hum521rm-webfont.woff2") format("woff2"),
    url("/src/assets/hum521rm-webfont.woff") format("woff");
}
@font-face {
  font-family: "humanst521_btbold";
  src: url("/src/assets/humanst521_bt_bold-webfont.woff2") format("woff2"),
    url("/src/assets/humanst521_bt_bold-webfont.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}
.p-v-btn {
  font-family: "humanst521_btbold";
  color: #fff;
}

.delete-art {
  margin-left: 40%;
}
.img-container {
  width: 25%;
}
.h3-resumen {
  font-family: "humanst521_btbold";
  font-size: 19px;
  color: #374763;
}
.v-btn {
  text-transform: none !important;
}
p {
  font-family: humanst521-1;
  font-size: 15px;
}

.h3-sub-desc-total {
  font-family: humanst521-1;
  font-size: 15px;
}
h3 {
  font-family: humanst521-1;
  color: #727272;
}
.h3-promo {
  font-family: "humanst521_btroman";
  font-size: 15;
  color: #374763;
}
.h3-prod {
  font-family: "humanst521_btbold";
  font-size: 15;
  color: black;
}

.div-comprar-total {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
.card-value {
  width: 30px;
  height: 30px;
  border: 0.2px solid #02265c;
  .number-value {
    color: #02265c;
    font-family: humanst521-2;
  }
}
.precio-value {
  color: #02265c;
  font-family: humanst521-2;
  font-size: 19px;
  margin-left: 50%;
}
h3 {
  font-family: humanst521-2;
  font-weight: bolder;
  font-size: 20px;
}
.bar-container {
  width: 100%;
  height: 0.2rem;
  display: flex;
  flex-direction: row;
  background: rgb(242, 192, 74);
  background: linear-gradient(
    90deg,
    rgba(242, 192, 74, 1) 140px,
    rgba(179, 182, 188, 1) 140px
  );
}

.mi-compra {
  font-family: "humanst521_btbold";
  color: black;
  font-size: 20px;
}
.h3-btn {
  font-family: "humanst521_btbold";
  color: #374763;
  font-size: 18px;
  letter-spacing: 0ch;
}

@media only screen and (max-width: 960px) {
  .container-mobile {
    transform: scale(0.85);
  }
}
</style>
