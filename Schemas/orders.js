const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const orderSchemaJSON = {
  order: String,
  location: String,
  state:String,
  belong: String,
  date: String
};

const orders_schema = new Schema(orderSchemaJSON);

const orders = mongoose.model("orders", orders_schema);

module.exports.orders = orders;