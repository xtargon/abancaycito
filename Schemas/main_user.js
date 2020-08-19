const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const userSchemaJSON = {
  author: ObjectId,
  user:  {
        type:String,
        required: true,
        unique: true,
        index: true
    },
  name: String,
  mail:  {
        type:String,
        required: true,
        unique: true,
        index: true
    },
  phone: String,
  password: String,
  type: String
};

const user_schema = new Schema(userSchemaJSON);

const User = mongoose.model("user_acces", user_schema);

module.exports.User = User;