var express = require("express");
var router = express.Router();
const Registermodel = require("../model/registerSchema");
const jwt = require("jsonwebtoken");
router.use("/register", (req, res) => {
  //var data = req.body;
  // var registerdata = {
  //   // firstname: req.body.firstname,
  //   // lastname: req.body.lastname,
  //   // email: req.body.email,
  //   // password: req.body.password
  // };
  var registerdata = req.body;

  var register = new Registermodel(registerdata);
  register.save(err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("registerd");
    console.log(register);

    let payload = { subject: register._id };
    console.log(payload);
    let token = jwt.sign(payload, "secretkey");
    console.log(token);
    res.send(token);
  });
});
//router.use("/home", (req, res) => {});
router.use("/login", (req, res) => {
  let data = req.body;
  let eemail = data.email;
  let pass = data.password;
  Registermodel.findOne({ email: eemail }, (err, user) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!user) {
      res.status(402).send("no email registerd");
    }
    if (pass != user.password) {
      res.status(401).send("unauthorized wrong password");
    }
    console.log(eemail + pass);
    let payload = { subject: user._id };
    let token = jwt.sign(payload, "secretkey");
    res.send({ token });
    console.log(user);
  });
});
function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }
  let payload = jwt.verify(token, "secretkey");
  if (!payload) {
    return res.status(401).send("Unauthorized requestUnauthorized request");
  }
  req.userId = payload.subject;
  next();
}
router.get("/event", verifyToken, (req, res) => {
  let homdata = [
    {
      id: "1",
      employee_name: "Tiger Nixon",
      employee_salary: "320800",
      employee_age: "61",
      profile_image: ""
    },
    {
      id: "2",
      employee_name: "Garrett Winters",
      employee_salary: "170750",
      employee_age: "63",
      profile_image: ""
    },
    {
      id: "3",
      employee_name: "Ashton Cox",
      employee_salary: "86000",
      employee_age: "66",
      profile_image: ""
    },
    {
      id: "4",
      employee_name: "Cedric Kelly",
      employee_salary: "433060",
      employee_age: "22",
      profile_image: ""
    }
  ];
  res.json(homdata);
});
module.exports = router;
