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
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap" rel="stylesheet">
        
            <title>Finalizado!</title>
        </head>
        <body>
            <style>
                body{
                    display: flex;
                    justify-content: center;
                    align-content:center ;
                    padding: 0;
                    margin: 0;
                }
            
                body div{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 50%;
                    background-color: #fff;
                    width: 100%;
                    padding: 0;
                    margin: 0;
                    
                }
                body div h3 , body div p{
                    font-family: 'Montserrat', sans-serif;
                    color: #000;
                    font-size: 15px;
                }
                body div p{
                    font-size: 25px;
                }
                h3, p {
                    color: #000;
                    
                }
                h3{
                    font-size: 25px;
                }
                p{
                    font-size: 15px;
                }
                .div-container{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
        
                }
                .img-container{
                    width: 15%;
                    height: 15%;
                }
                .img-mg{
                    width: 15%;
                    height: 15%;
                    padding-top: 3%;
                    padding-bottom: 3%;
                }
                .img-mp{
                    width: 15%;
                    height: 15%;
                }
                .btn{
                    height:40px;
                    width: 120px;
                    border: 2px solid transparent;
                    border-radius: 10px;
                    margin-bottom: 2%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 1.5%;
        
                }
                .btn:hover {
                    transform: scale(0.98);
                    cursor: pointer;
                }
                .btn h3{
                    font-family: 'Montserrat', sans-serif;
                    color: #000;
                    font-size: 13px;
                    margin: 0;
                    padding: 0;
                }
                .h3-principal{
                    font-size: 30px
        
                }
                .img-mg-container{
                    width: 100vw;
                    height: 15%;
                    background-color: #000;
                }
                .id{
                    display: flex;
                    flex-direction: row;
                    gap: 15px;
                }
                .estado{
                    display: flex;
                    flex-direction: row;
                    gap: 15px;
                }
                .ord-merch{
                    display: flex;
                    flex-direction: row;
                    gap: 15px;
                }
        
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap');
        
            </style>
        
            <div>
                <div class="div-container">
                        <div class="img-mg-container">
                            <img src="https://i.imgur.com/BxRmSFz.png" alt="Mucho Gusto" class="img-mg">
                        </div>
                        <img src="https://i.imgur.com/WtZxMaP.png" alt="mercadopago" class="img-mp">
                        <h3 class="h3-principal">Compra Aprobada!</h3>
                </div>
                <p>
                    Por favor, guarda estos datos , en caso de que tu compra tenga algun problema,
                    te los pediremos.
                </p>
                <div class="id">
                    <h3>ID:</h3> <h3> ${req.query.collection_id}</h3>
                </div>
                <div class="estado">
                    <h3>Estado:</h3> <h3> ${req.query.collection_status}</h3>
                </div>
                <div class="ord-merch">
                    <h3>Numero de orden Mercantil: </h3> <h3> ${req.query.merchant_order_id}</h3>
                </div>
                <button class="btn"><h3>Volver al Sitio</h3></button>
            </div>
                
        </body>
        <script>
            let btn = document.querySelector('.btn')
            btn.addEventListener('click', ()=>{
                window.open('https://prueba-auth-vuex-router.web.app/', '_self')
            })
        </script>
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
            const idCompra = {id : payment.body.order.id}
            const fecha = {fecha: new Date().toLocaleString('es-Ar' , {timeZone: 'America/Argentina/Buenos_Aires'})}
            Object.assign(compraDb, total)
            Object.assign(compraDb,paymentMetadata)
            Object.assign(compraDb,estado)
            Object.assign(compraDb, items)
            Object.assign(compraDb, fecha)
            Object.assign(compraDb, idCompra)
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
