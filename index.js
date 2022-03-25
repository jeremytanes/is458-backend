const express = require("express");
const cors = require('cors');

require("dotenv").config();
const app = express();
const database = require("./database");
const { ListTablesCommand } = require("@aws-sdk/client-dynamodb");

const Product = require("./routes/product");
const ProductCategory = require("./routes/productCategory");
const Transaction = require("./routes/transaction");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(express.json());
app.use("/product", Product);
app.use("/productCategory", ProductCategory);
app.use("/transaction", Transaction);
app.use(express.static('public')); // stripe static files

//const YOUR_DOMAIN = 'http://localhost:8080';
//https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=checkout#create-product-prices-upfront
// app.post('/create-checkout-session', async (req, res) => {
//     console.log(req.body)
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//           price:'price_1KgLfpGi1xhtC9Ld7eXmf1wp',
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${YOUR_DOMAIN}/success.html`,
//       cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//     });
//     res.status(200).send(session.url).end();
//     //res.redirect(303, session.url);
// });

//NEW
app.post("/create-payment-intent", async (req, res) => {
  const paymentDetails = req.body;
  /*
    {
      "email": "robin.chong.2019@smu.edu.sg",
      "firstName": "Robin",
      "lastName": "Chong",
      "phoneNumber": "+6590229102",
      "addressLineOne": "81 Victoria St, Singapore 188065",
      "addressLineTwo": "",
      "city": "Singapore",
      "country": "Singapore",
      "items": [
          {
              "productId": "86875ccd-9944-48b5-8676-e8795edb7f22",
              "productCategory": "Shirt",
              "quantity": "4"
          },
          {
              "productId": "e8207ef3-37bb-4eca-91dc-55699908f8bd",
              "productCategory": "Camera",
              "quantity": 1
          },
          {
              "productId": "6bfdd7f2-8757-4df8-b9d4-2ce7fb6284d7",
              "productCategory": "Camera",
              "quantity": 1
          },
          {
              "productId": "3a4dc877-6bcc-4dbe-832a-5a8770fdba91",
              "productCategory": "Camera",
              "quantity": 1
          }
      ]
    }
  */
  let subtotal = 0;
  //Calculate & add to subtotal
  
  let tax = subtotal * 0.07
  let totalAmount = subtotal + tax;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount*100,
    currency: "sgd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Webhook handler for asynchronous events. - https://github.com/stripe-samples/checkout-one-time-payments/blob/master/server/node/server.js
app.post('/webhook', async (req, res) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers['stripe-signature'];

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === 'checkout.session.completed') {
    console.log(`🔔  Payment received!`);
  }
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.status(200).send("Hello, world!").end();
});



app.get("/table", (req, res) => {
  (async () => {
    const command = new ListTablesCommand({});
    try {
      const results = await database.client.send(command);
      let tableNames = results.TableNames.join("\n");
      console.log("TABLE NAMES:", tableNames);
      res.status(200).send(tableNames).end();
    } catch (err) {
      console.error(err);
      res.status(403).send("Forbidden").end();
    }
  })();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
