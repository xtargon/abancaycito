const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const sold_img_SchemaJSON = {
  author: String,
  ruta:String,
  item_belong: String,
  date: String
};

const sold_img_schema = new Schema(sold_img_SchemaJSON);

const sold_imagen = mongoose.model("sold_img", sold_img_schema);

module.exports.sold_imagen = sold_imagen;