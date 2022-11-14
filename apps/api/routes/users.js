var express = require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
var { authJwt } = require("../middleware");
var router = express.Router();

/* GET test access to everyone */
router.get('/', function(req, res, next) {
  res.send('Access to everyone');
});

/* GET test access to admin only */
router.get('/dashboard', [authJwt.verifyToken], function(req, res, next) {
  res.send('only if the jwt is verified');
})

module.exports = router;
