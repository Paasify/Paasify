const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

/**
 *
 * @param {string} username Username of the user.
 * @returns
 */
async function getUserWithUsername(username) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  })
  if (user !== null) {
    return user
  }
}

/**
 *
 * @param {string} id id of the user.
 * @returns
 */
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

/**
 *
 * @param {string} username Username of the user.
 * @param {string} password Password of the user.
 * @returns
 */
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
  console.log(`username: ${username}, email: ${email}, password: ${password}`)
  // let hashPass = ''
  const user = await getUserWithUsername(username)
  console.log('getUserWithUsername ran:', user)
  if (user) {
    console.log('user already exists')
    return { userCreated: false, status: false, error: 'User already exists' }
  }
  const generatedSalt = await bcrypt.genSalt(10)
  const generatedHash = await bcrypt.hash(password, generatedSalt)
  // console.log(generatedSalt, generatedHash)
  await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: generatedHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
  return { userCreated: true, status: true, error: false }

  //   , null, async function (err, hash) {
  //     if (err) {
  //       return { userCreate: false, status: false, error: err }
  //     }

  //     hashPass = hash
  //     await prisma.User.create({
  //       data: {
  //         username,
  //         email,
  //         password: hashPass,
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //       },
  //     })
  //     return { userCreated: true, status: true, error: false }
  //   })
  // }).catch((err) => {
  //   console.log('err: ', err)
  //   return { userCreated: false, status: false, error: err }
  // })

  // , function (err, salt) {
  //   console.log('salt: ', salt)
  //   if (err) {
  //     return { userCreated: false, status: false, error: err }
  //   }
  //   bcrypt.hash(password, salt, null, async function (err, hash) {
  //     if (err) {
  //       return { userCreate: false, status: false, error: err }
  //     }

  //     hashPass = hash
  //     await prisma.User.create({
  //       data: {
  //         username,
  //         email,
  //         password: hashPass,
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //       },
  //     })
  //     return { userCreated: true, status: true, error: false }
  //   })
  // })
}

module.exports = {
  getUserWithUsername,
  getUserWithId,
  verifyUserLogin,
  createUser,
}
