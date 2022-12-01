/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
/* eslint-disable linebreak-style */
const fetch = require("node-fetch");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const mercadopago = require("mercadopago");

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



exports.webHooksNotif = functions.https.onRequest( async (req, res ) => {
  switch (req.method) {
    case "GET":
      res.send(
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Finalizado!</title>
        </head>
        <body>
            <style>
                body{
                    display: flex;
                    justify-content: center;
                    align-content:center ;
                }
            
                body div{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin-top: 10%;
                    height: 50%;
                    background-color: green;
                    width: 100%;
                    
                }
                h3, p {
                    color: white;
                    
                }
                h3{
                    font-size: 25px;
                }
                p{
                    font-size: 15px;
                }
            </style>
        
            <div>
                <h3>Compra Aprobada!</h3>
                <p>
                    Por favor, guarda estos datos , en caso de que tu compra tenga algun problema,
                    te los pediremos.
                </p>
                <h3>ID: ${req.query.collection_id}</h3>
                <h3>Estado: ${req.query.collection_status}</h3>
                <h3>Numero de orden Mercantil: ${req.query.merchant_order_id}</h3>
            </div>
        </body>
        </html>
        
        `


      )
      break;
    case "POST":
      const {query} =req;
      const topic = query.topic || query.type;
      var merchantOrder;
      let compraDb = {};
      switch (topic) {
        case "payment":
            const paymentId = query.id || query["data.id"];
            const payment = await mercadopago.payment.findById(paymentId);
            const paymentMetadata = payment.body.metadata
            const uid = paymentMetadata.user_uid
            merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id);
            const estado = {estado : merchantOrder.body.order_status}
            const items = {items: merchantOrder.body.items};
            const total = {total : payment.body.transaction_amount}
            const fecha = {fecha: new Date().toLocaleString("es-AR")}
            Object.assign(compraDb, total)
            Object.assign(compraDb,paymentMetadata)
            Object.assign(compraDb,estado)
            Object.assign(compraDb, items)
            Object.assign(compraDb, fecha)

            admin.firestore().collection(`Compras`).doc(`${paymentId}`).set(compraDb).then(writeResult => {
              console.log(writeResult)
            });

            admin.firestore().collection(`Usuarios`).doc(`${uid}`).collection(`Compras`).doc(`${paymentId}`).set(compraDb).then(writeResult => {
              console.log(writeResult)
            });
          break;
        default:
          break;
      }
      console.log(JSON.stringify(compraDb))
      res.status(200).send("OK")
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
        binary_mode: true,
        items:  req.body.items,
        back_urls: {
          "success": "https://prueba-auth-vuex-router.web.app",
          "failure": "https://prueba-auth-vuex-router.web.app",
          "pending": "https://prueba-auth-vuex-router.web.app",
        },
        auto_return: "approved",
        metadata: req.body.metadata,
      };
      mercadopago.preferences.create(preference)
          .then(function(response) {
            console.log(response.body)
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
