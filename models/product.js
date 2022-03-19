const dynamoose = require("dynamoose");

const productSchema = new dynamoose.Schema(
  {
    productCategory: {
      type: String,
      hashKey: true, // partition key
    },
    productId: {
      type: String,
      rangeKey: true, //sort key
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productImageUrl: {
      type: String,
      required: true,
    },
  },
  {
    saveUnknown: false,
    timestamps: true,
  }
);

dynamoose.model("Product", productSchema);
