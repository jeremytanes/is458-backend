const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const dynamoose = require("dynamoose");
const ProductModel = require("./models/product");

const client = new DynamoDBClient();

module.exports = { client };
