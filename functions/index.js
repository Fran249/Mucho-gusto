/* eslint-disable linebreak-style */
const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const mercadopago = require("mercadopago");


const app = express();
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://prueba-auth-vuex-router-default-rtdb.firebaseio.com",
});


// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
  // eslint-disable-next-line max-len
  access_token: "APP_USR-230223288523320-110912-97c1dc3e80cdc76c92fb312792fb0abb-1214270037",
  client_id: "230223288523320",
  client_secret: "4fqLxozdeLsitKi7eljQXwWsUs5MDHAW",
});


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("./client"));
app.use(cors());

app.post("/", (req, res) => {
  const preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      "success": "http://localhost:8080/feedback",
      "failure": "http://localhost:8080/feedback",
      "pending": "http://localhost:8080/feedback",
    },
    auto_return: "approved",
  };

  mercadopago.preferences.create(preference)
      .then(function(response) {
        res.json({
          id: response.body.id,
        });
        console.log(response);
      }).catch(function(error) {
        console.log(error);
      });
});

app.get("/feedback", function(req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

app.get("/", function(req, res) {
  res.status(200).sendFile("index.html");
});

exports.app = functions.https.onRequest(app);

exports.cart = functions.https.onCall((data, context)=>{
  const cart = JSON.stringify(data.cart);
  return `esta es tu data ${cart}`;
});
