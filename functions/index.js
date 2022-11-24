/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
/* eslint-disable linebreak-style */
const fetch = require("node-fetch");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const mercadopago = require("mercadopago");
const { doc } = require("firebase/firestore");

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
      fetch(`https://api.mercadopago.com/merchant_orders/${req.query.merchant_order_id}`, {
        headers: {
          "Authorization": "Bearer APP_USR-230223288523320-110912-97c1dc3e80cdc76c92fb312792fb0abb-1214270037",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => response.json()).then((data)=>
        console.log("data")
      );
      res.send('method get')
      break;
    case "POST":
      const {query} =req;
      const topic = query.topic || query.type;
      var merchantOrder;
      let compraDb = {};
      let uid = "";
      switch (topic) {
        case "payment":
            const paymentId = query.id || query["data.id"];
            const payment = await mercadopago.payment.findById(paymentId);
            const paymentMetadata = payment.body.metadata
            uid = paymentMetadata.user_uid
            Object.assign(compraDb, paymentMetadata)
            merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id);
            const estado = {estado : merchantOrder.body.order_status}
            Object.assign(compraDb, estado)
            const items = merchantOrder.body.items;
            Object.assign(compraDb, items)
            admin.firestore().collection(`Compras`).get().then((docSnapshot)=>{
              if(docSnapshot.isEqual(compraDb)){
                return console.log("el documento ya existe")
              }else{
                admin.firestore().collection(`Compras`).add(compraDb). then(writeResult => {
                  console.log(writeResult)
                }); 
              }
            })

          break;
        default:
          break;
      }
      //console.log(merchantOrder.body.items)
      console.log(JSON.stringify(compraDb))
      
      //const data = JSON.stringify(req.body)
      //const data1 = JSON.stringify(req.query)
      //const id = req.body.data
      //console.log("este es el id stringify", JSON.stringify(id))
      //console.log("este es el id normal",req.body.data)
      //console.log(data)
      //console.log(data1)
      //res.status(200).send(req.body);
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
        
        items:  req.body.items,
        back_urls: {
          "success": "https://us-central1-prueba-auth-vuex-router.cloudfunctions.net/webHooksNotif",
          "failure": "https://us-central1-prueba-auth-vuex-router.cloudfunctions.net/webHooksNotif",
          "pending": "https://us-central1-prueba-auth-vuex-router.cloudfunctions.net/webHooksNotif",
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
