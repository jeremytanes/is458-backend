const dynamoose = require("dynamoose");

const productCategorySchema = new dynamoose.Schema(
  {
    parentCategory: {
      type: String,
      hashKey: true, // partition key
    },
    productCategory: {
      type: String,
      rangeKey: true, //sort key
    },
  },
  {
    saveUnknown: false,
    timestamps: false,
  }
);

dynamoose.model("ProductCategory", productCategorySchema);
