var express = require('express');
var router = express.Router();
var auth = require('../db/auth');
const { verifySignup } = require("../middleware")

/* POST User signup. */
router.post('/signup', [verifySignup.checkUser], auth.signup);

/* POST User login. */
router.post('/login', auth.signin);

module.exports = router;