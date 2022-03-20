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

router.post("/", (req, res) => {
  // incomplete. need to upload photo to s3 too.
  req.body["productId"] = uuidv4();
  ProductController.create(req.body, (error, result) => {
    if (error) {
      res.status(500).send(error).end();
    } else {
      res.status(201).send(result).end();
    }
  });
});

router.delete("/:productCategory/:productId", (req, res) => {
  ProductController.delete(
    req.params.productCategory,
    req.params.productId,
    (error) => {
      if (error) {
        res.status(500).send(error).end();
      } else {
        res.status(201).send("Product deleted successfully.").end();
      }
    }
  );
});

router.patch("/", (req, res) => {
  ProductController.update(req.body, (error) => {
    if (error) {
      res.status(500).send(error).end();
    } else {
      res.status(201).send("Product updated successfully.").end();
    }
  });
});

module.exports = router;
