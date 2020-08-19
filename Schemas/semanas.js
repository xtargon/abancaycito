const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const semanaSchemaJSON = {
  ident: String,
  dia: String,
  num_day:String,

};

const semanaschema = new Schema(semanaSchemaJSON);

const semana = mongoose.model("semana", semanaschema);

module.exports.semana = semana;