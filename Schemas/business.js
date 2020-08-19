const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const businessSchemaJSON = {
  author: String,
  name:String,
  description: String,
  location_business:String,
  phone: String,
  open: String,
  close: String,
  dedicated: String,
  logo: { type: String, default: '/static/img_main_file/abc_logo.png' },
  portada: String
};

const business_schema = new Schema(businessSchemaJSON);

const Business = mongoose.model("busin", business_schema);

module.exports.Business = Business;



