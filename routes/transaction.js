const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transaction");
const ProductController = require("../controllers/product");
const { v4: uuidv4 } = require("uuid");
const { transaction } = require("dynamoose");

router.get("/:email/:transactionId", (req, res) => {
  TransactionController.get(
    req.params.email,
    req.params.transactionId,
    (error, result) => {
      if (error == "Transaction not found.") {
        res.status(404).send(error).end();
      } else if (error) {
        res.status(500).send(error).end();
      } else {
        res.status(200).send(result).end();
      }
    }
  );
});

router.get("/all", (req, res) => {
  TransactionController.getAll((error, result) => {
    if (error) {
      res.status(500).send(error).end();
    } else {
      res.status(200).send(result).end();
    }
  });
});

router.get("/:email", (req, res) => {
  TransactionController.getAllOfEmail(req.params.email, (error, result) => {
    if (error) {
      res.status(500).send(error).end();
    } else {
      res.status(200).send(result).end();
    }
  });
});

router.post("/", (req, res) => {
  // create Promise from ProductController callback function
  const getPrice = (product) =>
    new Promise((resolve, reject) => {
      ProductController.getAttributes(
        product.productCategory,
        product.productId,
        ["price"],
        (error, result) => {
          if (error) {
            reject(new Error(error));
          } else {
            product["price"] = result.price;
            product["subtotalPrice"] = product.quantity * result.price;
            resolve(product);
          }
        }
      );
    });

  // add Promises to an array
  promise_array = [];
  for (let i in req.body.items) {
    var p = getPrice(req.body.items[i]);
    promise_array.push(p);
  }

  // run Promises and await all before showing results
  Promise.all(promise_array)
    .then((result) => {
      let totalPrice = 0;
      for (let product of result) {
        totalPrice += product.subtotalPrice;
      }

      var transaction = {
        transactionId: uuidv4(),
        email: req.body.email,
        totalPrice: totalPrice,
        items: result,
      };

      // create Transaction in database and return result
      TransactionController.create(transaction, (error, result) => {
        if (error) {
          res.status(500).send(error).end();
        } else {
          res.status(201).send(result).end();
        }
      });
    })
    .catch((error) => {
      if (error.message == "Product not found.") {
        res.status(404).send(error.message).end();
      } else {
        res.status(500).send(error.message).end();
      }
    });
});

router.delete("/:email/:transactionId", (req, res) => {
  TransactionController.delete(
    req.params.email,
    req.params.transactionId,
    (error) => {
      if (error) {
        res.status(500).send(error).end();
      } else {
        res.status(201).send("Transaction deleted successfully.").end();
      }
    }
  );
});

router.patch("/", (req, res) => {
  TransactionController.update(req.body, (error) => {
    if (error) {
      res.status(500).send(error).end();
    } else {
      res.status(201).send("Transaction updated successfully.").end();
    }
  });
});

module.exports = router;
