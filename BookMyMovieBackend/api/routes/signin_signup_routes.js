

var express = require('express');
var router = express.Router();

var user = require('../db_schemas/user_schema').user;
var verifySignUp = require('../middlewares/verifySignUp');
var controller = require('../controllers/auth.controller');

router.post('/register', [verifySignUp.checkDuplicateUsername], controller.signup);
// router.post('/register', controller.signup);
router.post('/login',controller.signin)

router.post('/loginasadmin',controller.signinasadmin)

module.exports = router;