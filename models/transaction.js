const dynamoose = require("dynamoose");

const transactionSchema = new dynamoose.Schema(
  {
    email: {
      type: String,
      hashKey: true, // partition key
    },
    transactionId: {
      type: String,
      rangeKey: true, //sort key
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
      schema: [
        {
          type: Object,
          schema: {
            productCategory: {
              type: String,
              required: true,
            },
            productId: {
              type: String,
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
            subtotalPrice: {
              type: Number,
              required: true,
            },
          },
        },
      ],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    addressLineOne: {
      type: String,
      required: true,
    },
    addressLineTwo: String,
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    stripePaymentIntentId: {
      type: String,
      required: true,
    },
  },
  {
    saveUnknown: false,
    timestamps: true,
  }
);

dynamoose.model("Transaction", transactionSchema);
