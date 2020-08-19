const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const soldSchemaJSON = {
  author: String,
  name:String,
  description: String,
  phone: String,
  price: String,
  date: String,
  principal_rute: String,
  categorie: String
};

const sold_schema = new Schema(soldSchemaJSON);

const sold = mongoose.model("sold", sold_schema);

module.exports.sold = sold;

