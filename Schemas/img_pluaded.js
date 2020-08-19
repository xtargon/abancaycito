const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const imagenes_befSchemaJSON = {
  Ruta: String,
  property: String
};


const imgbef_schema = new Schema(imagenes_befSchemaJSON);

const imgbef = mongoose.model("imagenes_beef", imgbef_schema);

module.exports.imgbef = imgbef