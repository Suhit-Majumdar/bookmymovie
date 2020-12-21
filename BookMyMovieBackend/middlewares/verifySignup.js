// const db = require("../models");
// const ROLES = db.ROLES;
// const User = db.user;

const User = require('../db_schemas/user_schema').user;

checkDuplicateUsername = (req, res, next) => {
  // Username
  User.findOne({
    email : req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Email is already in use!" });
      return;
    }
    
    next();
  });
};


const verifySignUp = {
  checkDuplicateUsername
};

module.exports = verifySignUp;