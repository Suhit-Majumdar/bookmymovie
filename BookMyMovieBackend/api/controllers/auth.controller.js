

const config = require("../config/auth.config");
// const db = require("../models");
// const User = db.user;
// const Role = db.role;
const User = require('../db_schemas/user_schema').user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { admin } = require("../db_schemas/admin_schema");
const { user } = require("../db_schemas/user_schema");

module.exports.signup = (req, res) => {

  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mobileno: req.body.mobileno,
    location: req.body.location
  });

  user.save(function(err,user) {
      if(err) {
          res.status(500).send({message: err});
          return;
        }
        res.send("User registered successfully");
    });

    // User.findOne({email: req.body.email}, function(err, userins) {
    //     if(err) {
    //         res.status(500).send({message: err});
    //         return;
    //     }
    //     // console.log(userins);
    //     if(userins) {
    //         res.status(409).send({message: 'Email is already registered'});
    //     } else {
    //         user.save(function(err,user) {
    //         if(err) {
    //             res.status(500).send({message: err});
    //             return;
    //         }
    //         res.send("User registered successfully");
    //         });
    //     }
    // });
}

module.exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ username : user.email }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        email: user.email,
        accessToken: token
      });
    });
};

module.exports.signinasadmin = (req, res) => {
  admin.findOne({
    email: req.body.email
  })
    .exec((err, admin) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!admin) {
        return res.status(404).send({ message: "Not found." });
      }

      var passwordIsValid = (req.body.password == admin.password);
      // bcrypt.compareSync(
      //   req.body.password,
      //   user.password
      // );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ username : admin.email }, config.adminsecret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        email: admin.email,
        // roles: authorities,
        accessToken: token
      });
    });
};