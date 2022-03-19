const dynamoose = require("dynamoose");
const Product = dynamoose.model("Product");

module.exports["get"] = function (partitionKey, sortKey, callback) {
  let primaryKey = {
    productCategory: partitionKey,
    productId: sortKey,
  };
  Product.get(primaryKey, (error, product) => {
    if (product == undefined) {
      error = "Product not found.";
    }
    if (error) {
      callback(error, null);
    } else {
      callback(null, product);
    }
  });
};

module.exports["getAll"] = function (callback) {
  console.log("get all products");
  Product.scan().exec((error, products) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, products);
    }
  });
};

module.exports["getAllOfCategory"] = function (productCategory, callback) {
  Product.query("productCategory")
    .eq(productCategory)
    .all()
    .exec((error, products) => {
      if (products == undefined) {
        error = "Product does not exist.";
      }
      if (error) {
        callback(error, null);
      } else {
        callback(null, products);
      }
    });
};
