const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product");

router.get("/:productCategory/:productId", (req, res) => {
  console.log("route /toys");
  ProductController.get(
    req.params.productCategory,
    req.params.productId,
    (error, result) => {
      if (error) {
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
