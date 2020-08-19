const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const articlesSchemaJSON = {
  belonging: String,
  name:String,
  description: String,
  price:String
};


const articles_schema = new Schema(articlesSchemaJSON);

const Articles = mongoose.model("articles_in_sales", articles_schema);

module.exports.Articles = Articles