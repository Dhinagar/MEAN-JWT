const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const PORT = 3000;
const routes = require("./router/apis");
const mongoose = require("mongoose");
const mongourl =
  "mongodb+srv://dhinagar:dhinagar@cluster0-dg4lx.mongodb.net/test?retryWrites=true&w=majority";
const app = express(); //create instance of express
app.use(cors());

app.use(bodyparser.json());
app.use("/api", routes);
app.get("/", (req, res) => {
  res.send(" i am hello dhinagar ");
});
app.listen(PORT, () => {
  console.log("yoo ur wrking in" + PORT);
});
mongoose.connect(
  mongourl,
  { useUnifiedTopology: true, useNewUrlParser: true },
  err => {
    if (err) throw err;
    console.log("db conncted");
  }
);
