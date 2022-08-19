const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function getUserWithUsername(username) {
  return await prisma.user.findUnique({
    where: {
      username: username,
    },
  })
}

async function getUserWithId(id) {
  return await prisma.User.findUnique({
    where: {
      id: id,
    },
    include: {
      username: true,
      password: true,
    },
  })
}

async function verifyUserLogin(username, password) {
  const user = await getUserWithUsername(username)
  if (!user) {
    return { userfound: false, status: false, error: false }
  }
  bcrypt.compare(password, user.password, (err, res) => {
    if (err) {
      return { userfound: true, status: false, error: err }
    }
    if (!res) {
      return { userfound: true, status: false, error: false }
    }
    return { userfound: true, status: res, error: false }
  })
}

/**
 *
 * @param username Username of the user.
 * @param email Email of the user.
 * @param password Password of the user.
 * @returns
 */
async function createUser(username, email, password) {
  let hashPass = ''
  const user = await getUserWithUsername(username)
  if (user) {
    return { userCreated: false, status: false, error: 'User already exists' }
  }
  const hashedPassword = bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return { userCreated: false, status: false, error: err }
    }
    bcrypt.hash(password, salt, null, async function (err, hash) {
      if (err) {
        return { userCreate: false, status: false, error: err }
      }

      hashPass = hash
      await prisma.User.create({
        data: {
          username,
          email,
          password: hashPass,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
      return { userCreated: true, status: true, error: false }
    })
  })
}

module.exports = {
  getUserWithUsername,
  getUserWithId,
  verifyUserLogin,
  createUser,
}
