const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { admin } = require("../db_schemas/admin_schema.js");
// const db = require("../models");
// const User = db.user;
// const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.username = decoded.username;
    // console.log(decoded);

    next();
  });
};

isAdmin = function(req, res, next) {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.adminsecret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.username = decoded.username;
    // console.log(decoded);

    next();
  });
}

const authJwt = {
  verifyToken,
  isAdmin
};
module.exports = authJwt;
