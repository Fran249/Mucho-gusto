const mercadopago = require("mercadopago");
// Agrega credenciales
const mercadoPago = mercadopago.configure({
  access_token: process.env.VUE_APP_MP_ACCESS_TOKEN,
});


export { mercadoPago }