const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

checkUser = async (req, res, next) => {
    // counting total users
    const totalUsers = await prisma.user.count()
    if (totalUsers) {
        res.status(400).send({
            message: "Failed! Admin already created."
        })
        return
    }
    next();
}

module.exports = { checkUser }