const dynamoose = require("dynamoose");
const Transaction = dynamoose.model("Transaction");

module.exports["get"] = function (partitionKey, sortKey, callback) {
  let primaryKey = {
    email: partitionKey,
    transactionId: sortKey,
  };
  Transaction.get(primaryKey, (error, transaction) => {
    if (transaction == undefined) {
      error = "Transaction not found.";
    }
    if (error) {
      callback(error, null);
    } else {
      callback(null, transaction);
    }
  });
};

module.exports["getAll"] = function (callback) {
  Transaction.scan().exec((error, transactions) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, transactions);
    }
  });
};

module.exports["getAllOfEmail"] = function (email, callback) {
  Transaction.query("email")
    .eq(email)
    .all()
    .exec((error, transactions) => {
      if (transactions == undefined) {
        error = "Transaction does not exist.";
      }
      if (error) {
        callback(error, null);
      } else {
        callback(null, transactions);
      }
    });
};

module.exports["create"] = function (transaction, callback) {
  Transaction.create(transaction, (error, transaction) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, transaction);
    }
  });
};

module.exports["delete"] = function (partitionKey, sortKey, callback) {
  let primaryKey = {
    email: partitionKey,
    transactionId: sortKey,
  };
  Transaction.delete(primaryKey, (error) => {
    if (error) {
      callback(error);
    } else {
      callback("Transaction deleted successfully.");
    }
  });
};

module.exports["update"] = function (body, callback) {
  let primaryKey = {
    email: body.email,
    transactionId: body.transactionId,
  };
  delete body.email;
  delete body.transactionId;
  Transaction.update(primaryKey, body, (error) => {
    if (error) {
      callback(error);
    } else {
      callback("Transaction updated successfully.");
    }
  });
};
