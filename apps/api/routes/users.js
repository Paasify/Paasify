var express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
var { authJwt } = require("../middleware");
var router = express.Router();

/* GET test access to everyone */
router.get("/", function (req, res, next) {
  res.send("Access to everyone");
});

/* GET test access to admin only */
router.get("/dashboard", [authJwt.verifyToken], function (req, res, next) {
  res.send("only if the jwt is verified");
});

/* GET User registered */
router.get("/registered", async function (req, res) {
  const count = await prisma.user.count();
  if (count !== 0) {
    res.send({ registered: true, message: "User registered" });
  }
});

module.exports = router;
