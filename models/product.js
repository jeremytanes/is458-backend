const dynamoose = require("dynamoose");

const productSchema = new dynamoose.Schema(
  {
    productCategory: {
      type: String,
      hashKey: true, // partition key
    },
    productId: {
      type: Number,
      rangeKey: true, //sort key
    },
    name: String,
    description: String,
    price: Number,
    productImageUrl: String,
  },
  {
    saveUnknown: false,
    timestamps: true,
  }
);

dynamoose.model("Product", productSchema);
