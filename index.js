const express = require("express");
require("dotenv").config();
const app = express();
const database = require("./database");
const { ListTablesCommand } = require("@aws-sdk/client-dynamodb");

const Product = require("./routes/product");

app.use(express.json());
app.use("/product", Product);

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
