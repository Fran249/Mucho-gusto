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
  access_token: "TEST-7013260771266051-100918-aa63e869198f3c6891f8fe2dffc460d1-768310453",
});


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("../functions"));
app.use(cors());
app.get("/", function(req, res) {
  res.status(200).sendFile("index.html");
});

app.post("/create_preference", (req, res) => {
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


exports.app = functions.https.onRequest(app);


