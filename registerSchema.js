const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Registerschema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String
});
const Registermodel = mongoose.model("register", Registerschema);
module.exports = Registermodel;
