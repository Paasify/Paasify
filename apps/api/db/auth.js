const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

signup = async (req, res) => {
    // CREATE user to database
    const hashPass = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            password: hashPass,
            userName: req.body.username,
        },
        select: {
            id: true,
            email: true,
        }
    });
    if (user.email == req.body.email) {
        res.status(200).send({
            message: "User was registered successfully!"
        });
    } else {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        })
    }
}

signin = async (req, res) => {
    const user = await prisma.user.findFirst({
        where: {
            email: req.body.email,
        },
        select: {
            id: true,
            email: true,
            userName: true,
            password: true,
        }
    });
    
    if (!user) {
        return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }

    var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
    });
    return res.status(200).send({
        id: user.id,
        userName: user.userName,
        email: user.email,
        accessToken: token
    });
}

module.exports = {
    signup,
    signin,
}