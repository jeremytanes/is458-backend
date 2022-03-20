const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transaction");
const ProductController = require("../controllers/product");
const { v4: uuidv4 } = require("uuid");

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

// router.post("/", (req, res) => {
//   console.log(req.body);
//   let totalPrice = 0;
//   for (let item of req.body["items"]) {
//     console.log("ITEM", item);
//     ProductController.getAttributes(
//       item.productCategory,
//       item.productId,
//       ["price"],
//       (error, result) => {
//         if (error) {
//           console.log("line 54");
//           // add code to pass error to end response
//         } else {
//           item["subtotalPrice"] = result.price * item.quantity;
//           totalPrice += item["subtotalPrice"];
//         }
//       }
//     );
//   }

//   req.body["totalPrice"] = totalPrice;
//   req.body["transactionId"] = uuidv4();
//   console.log("NEW ITEM", req.body);
//   TransactionController.create(req.body, (error, result) => {
//     if (error) {
//       res.status(500).send(error).end();
//     } else {
//       res.status(201).send(result).end();
//     }
//   });
// });

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
