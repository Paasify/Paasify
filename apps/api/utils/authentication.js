const jwt = require('jwt-simple')
const handlers = require('../utils/handlers')

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET)
}

exports.login = function (req, res) {
  console.log('/login route ran')
  res.send({ token: tokenForUser(req.user) })
}

exports.signup = async function (req, res, next) {
  console.log('/signup route ran')
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  if (!username || !email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide username, email and password' })
  }

  const user = handlers.getUserWithUsername(username)

  if (user) {
    return res.status(422).send({ error: 'User already exists' })
  }

  handlers.createUser(username, email, password)
  res.json({ token: tokenForUser(user) })
}
