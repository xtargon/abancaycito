const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const archived_restorantSchemaJSON = {
  order: String,
  location: String,
  state:String,
  belong: String,
  date: String
};

const archived_restorant_schema = new Schema(archived_restorantSchemaJSON);

const archived_restorant = mongoose.model("archived_restorant", archived_restorant_schema);

module.exports.archived_restorant = archived_restorant;