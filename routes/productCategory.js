const express = require("express");
const router = express.Router();
const ProductCategoryController = require("../controllers/productCategory");

router.get("/:parentCategory/:productCategory", (req, res) => {
  ProductCategoryController.get(
    req.params.parentCategory,
    req.params.productCategory,
    (error, result) => {
      if (error == "Product Category not found.") {
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
  ProductCategoryController.getAll((error, result) => {
    if (error) {
      res.status(500).send(error).end();
    } else {
      res.status(200).send(result).end();
    }
  });
});

router.get("/:parentCategory", (req, res) => {
  ProductCategoryController.getAllOfParentCategory(
    req.params.parentCategory,
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
  ProductCategoryController.create(req.body, (error, result) => {
    if (error) {
      res.status(500).send(error).end();
    } else {
      res.status(201).send(result).end();
    }
  });
});

router.post("/batchPut", (req, res) => {
  ProductCategoryController.batchPut(req.body, (error, result) => {
    if (error) {
      console.log("You suck");
      res.status(500).send(error).end();
    } else {
      console.log("Success");
      res.status(201).send(result).end();
    }
  });
});

router.delete("/:parentCategory/:productCategory", (req, res) => {
  ProductCategoryController.delete(
    req.params.parentCategory,
    req.params.productCategory,
    (error) => {
      if (error) {
        res.status(500).send(error).end();
      } else {
        res.status(201).send("Product Category deleted successfully.").end();
      }
    }
  );
});

module.exports = router;
