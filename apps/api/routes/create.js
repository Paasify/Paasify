var express = require("express");
var { authJwt } = require("../middleware");
var router = express.Router();

/* POST Add App creation job to queue */
router.post("/create", [authJwt.verifyToken], function (req, res, next) {
    console.log(req.body);
    res.send({ message: "Added to queue!" });
});

/* POST Test useCredentials */
router.post("/test", [authJwt.verifyToken], function (req, res, next) {
    console.log(req.userId);
    res.status(200).send({ message: "Added to queue!" });
})

module.exports = router;