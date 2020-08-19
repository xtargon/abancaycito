const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const sold_archiveSchemaJSON = {
  author: String,
  name:String,
  description: String,
  phone: String,
  price: String,
  date: String,
  before_id: String
};

const sold_archive_schema = new Schema(sold_archiveSchemaJSON);

const sold_archive = mongoose.model("sold_archive", sold_archive_schema);

module.exports.sold_archive = sold_archive;