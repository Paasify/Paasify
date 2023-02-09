const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

verifyToken = (req, res, next) => {
    let token = req.cookies._auth;
    console.log(token)
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log('decoded', decoded)
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    })
    console.log("Token not valid!")
    res.status(401).send({ message: "Wrong Token!" });
}

module.exports = { verifyToken }