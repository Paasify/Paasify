const jwt = require('jwt-simple')
const handlers = require('../utils/handlers')

/**
 *
 * @param {object} user user object
 * @returns
 */
function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET)
}

/**
 *
 * @param {*} req request object
 * @param {*} res response object
 */
exports.login = function (req, res) {
  console.log('req:', req)
  res.send({ token: tokenForUser(req.user) })
}

/**
 *
 * @param {*} req request object
 * @param {*} res response object
 * @param {*} next next function
 * @returns
 */
exports.signup = async function (req, res, next) {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  if (!username || !email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide username, email and password' })
  }

  var user = await handlers.getUserWithUsername(username)
  console.log(user)
  if (user) {
    console.log('user already exists')
    return res.status(422).send({ error: 'User already exists' })
  }

  user = await handlers.createUser(username, email, password)
  res.json({ token: tokenForUser(user) })
}
