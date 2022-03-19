const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product");
const { v4: uuidv4 } = require("uuid");

router.get("/:productCategory/:productId", (req, res) => {
  ProductController.get(
    req.params.productCategory,
    req.params.productId,
    (error, result) => {
      if (error == "Product not found.") {
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
  ProductController.getAll((error, result) => {
    if (error) {
      res.status(500).send(error).end();
    } else {
      res.status(200).send(result).end();
    }
  });
});

router.get("/:productCategory", (req, res) => {
  ProductController.getAllOfCategory(
    req.params.productCategory,
    (error, result) => {
      if (error) {
        res.status(500).send(error).end();
      } else {
        res.status(200).send(result).end();
      }
    }
  );
});

module.exports = router;
