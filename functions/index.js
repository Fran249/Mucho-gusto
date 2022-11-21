/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
/* eslint-disable linebreak-style */
const fetch = require("node-fetch");
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

app.post("/app", (req, res) => {
  const preference =
  {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      "success": "https://us-central1-prueba-auth-vuex-router.cloudfunctions.net/app/feedback",
      "failure": "https://us-central1-prueba-auth-vuex-router.cloudfunctions.net/app/feedback",
      "pending": "https://us-central1-prueba-auth-vuex-router.cloudfunctions.net/app/feedback",
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

app.post("/app", (req, res)=>{
  console.log(req.body);
  res.send(200).send("OK");
});

app.get("/", function(req, res) {
  res.status(200).sendFile("index.html");
});

exports.app = functions.https.onRequest(app);

exports.cart = functions.https.onCall((data, context) => {
  const mercadopago = require("mercadopago");


  const cart = data.cart;
  let resp = "";
  mercadopago.configure({
    // eslint-disable-next-line max-len
    access_token: "APP_USR-230223288523320-110912-97c1dc3e80cdc76c92fb312792fb0abb-1214270037",
    client_id: "230223288523320",
    client_secret: "4fqLxozdeLsitKi7eljQXwWsUs5MDHAW",
  });
  // eslint-disable-next-line max-len
  const AccessToken = "APP_USR-230223288523320-110912-97c1dc3e80cdc76c92fb312792fb0abb-1214270037";
  const preference =
    {
      items: [
        {
          title: cart,
          unit_price: 123,
          quantity: 123,
        },
      ],
      back_urls: {
        "success": "http://localhost:8080/feedback",
        "failure": "http://localhost:8080/feedback",
        "pending": "http://localhost:8080/feedback",
      },
      auto_return: "approved",
    };
  fetch(`https://api.mercadopago.com/checkout/preferences?access_token=${AccessToken}`, {
    method: "POST",
    body: preference,
  }).then(function(response) {
    resp = response;
  });
  return `esta es tu data ${resp}`;
});

exports.webHooksNotif = functions.https.onRequest((req, res ) => {
  switch (req.method) {
    case "GET":
      fetch(`https://api.mercadopago.com/merchant_orders/${req.query.merchant_order_id}`, {
        headers: {
          "Authorization": "Bearer APP_USR-230223288523320-110912-97c1dc3e80cdc76c92fb312792fb0abb-1214270037",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => response.json()).then((data) =>
        res.send(`<!DOCTYPE html>
        <html>
        <head>
        <style>
        body {background-color: green;
              display: flex;
              justify-content: center;}
        h1   {color:black;}
        p    {color: black;}
        </style>
        </head>
        <body>
        <h1>${JSON.stringify(data.order_status)}</h1>
        <h1>${JSON.stringify(data.items[0].title)}</h1>
        <h1>${JSON.stringify(data.items[0].quantity)}</h1>
        <h1>${JSON.stringify(data.items[0].unit_price)}</h1>
        </body>
        </html>`)
      );
      break;
    case "POST":
      console.log(JSON.stringify(req.body.data));
      console.log(req.body.id);
      res.status(200).send(req.body);
      break;
    default:
      res.send("method default on fire");
  }
});

exports.mpActions = functions.https.onRequest((req, res ) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  switch (req.method) {
    case "GET":
      res.send("method GET on fire");
      break;
    case "POST":
      console.log("estas usando mp");
      const mercadopago = require("mercadopago");
      mercadopago.configure({
        // eslint-disable-next-line max-len
        access_token: "APP_USR-230223288523320-110912-97c1dc3e80cdc76c92fb312792fb0abb-1214270037",
        client_id: "230223288523320",
        client_secret: "4fqLxozdeLsitKi7eljQXwWsUs5MDHAW",
      });
      const preference =
      {
        items: [
          {
            title: req.body.description,
            unit_price: Number(req.body.price),
            quantity: Number(req.body.quantity),
          },
        ],
        back_urls: {
          "success": "https://us-central1-prueba-auth-vuex-router.cloudfunctions.net/webHooksNotif",
          "failure": "https://us-central1-prueba-auth-vuex-router.cloudfunctions.net/webHooksNotif",
          "pending": "https://us-central1-prueba-auth-vuex-router.cloudfunctions.net/webHooksNotif",
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
      break;
    default:
      res.send("method default on fire");
  }
});
