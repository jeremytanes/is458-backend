const dynamoose = require("dynamoose");
const ProductCategory = dynamoose.model("ProductCategory");

module.exports["get"] = function (partitionKey, sortKey, callback) {
  let primaryKey = {
    parentCategory: partitionKey,
    productCategory: sortKey,
  };
  ProductCategory.get(primaryKey, (error, productCategory) => {
    if (productCategory == undefined) {
      error = "Product Category not found.";
    }
    if (error) {
      callback(error, null);
    } else {
      callback(null, productCategory);
    }
  });
};

module.exports["getAll"] = function (callback) {
  ProductCategory.scan().exec((error, productCategories) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, productCategories);
    }
  });
};

module.exports["getAllOfParentCategory"] = function (parentCategory, callback) {
  ProductCategory.query("parentCategory")
    .eq(parentCategory)
    .all()
    .exec((error, productCategories) => {
      if (productCategories == undefined) {
        error = "Product Category does not exist.";
      }
      if (error) {
        callback(error, null);
      } else {
        callback(null, productCategories);
      }
    });
};

module.exports["create"] = function (productCategory, callback) {
  ProductCategory.create(productCategory, (error, productCategory) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, productCategory);
    }
  });
};

module.exports["delete"] = function (partitionKey, sortKey, callback) {
  let primaryKey = {
    productCategory: partitionKey,
    productId: sortKey,
  };
  ProductCategory.delete(primaryKey, (error) => {
    if (error) {
      callback(error);
    } else {
      callback("Product Category deleted successfully.");
    }
  });
};

// TBC coz only fields are partitiion and sort keys
// module.exports["update"] = function (body, callback) {
//   let primaryKey = {
//     productCategory: body.productCategory,
//     productId: body.productId,
//   };
//   delete body.productCategory;
//   delete body.productId;
//   console.log(primaryKey);
//   console.log(body);
//   Product.update(primaryKey, body, (error) => {
//     if (error) {
//       callback(error);
//     } else {
//       callback("Product updated successfully.");
//     }
//   });
// };
