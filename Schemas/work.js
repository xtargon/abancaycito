const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const workSchemaJSON = {
  affair: String,
  location: String,
  phone:String,
  earn: String,
  belong: String,
  date: String
};

const work_schema = new Schema(workSchemaJSON);

const work = mongoose.model("work", work_schema);

module.exports.work = work;