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

module.exports["create"] = function (product, callback) {
  Product.create(product, (error, product) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, product);
    }
  });
};

module.exports["batchPut"] = async function (products, callback) {
  await Product.batchPut(products, (error, products) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, products);
    }
  });
};

module.exports["delete"] = function (partitionKey, sortKey, callback) {
  let primaryKey = {
    productCategory: partitionKey,
    productId: sortKey,
  };
  Product.delete(primaryKey, (error) => {
    if (error) {
      callback(error);
    } else {
      callback("Product deleted successfully.");
    }
  });
};

module.exports["update"] = function (body, callback) {
  let primaryKey = {
    productCategory: body.productCategory,
    productId: body.productId,
  };
  delete body.productCategory;
  delete body.productId;
  Product.update(primaryKey, body, (error) => {
    if (error) {
      callback(error);
    } else {
      callback("Product updated successfully.");
    }
  });
};

module.exports["getAttributes"] = function (
  partitionKey,
  sortKey,
  attributes,
  callback
) {
  // "attributes" takes in an array of strings
  let primaryKey = {
    productCategory: partitionKey,
    productId: sortKey,
  };
  Product.get(primaryKey, { attributes: attributes }, (error, product) => {
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
