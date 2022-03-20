const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const dynamoose = require("dynamoose");

const ProductModel = require("./models/product");
const ProductCategoryModel = require("./models/productCategory");
const TransactionModel = require("./models/transaction");

const client = new DynamoDBClient();

module.exports = { client };
