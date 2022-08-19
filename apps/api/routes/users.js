const Authentication = require('../utils/authentication')
var express = require('express')
var router = express.Router()
const passport = require('passport')
// const handlers = require('../utils/handlers');

const requireAuth = passport.authenticate('jwt', {
  session: false,
})
const requireSignIn = passport.authenticate('local', {
  session: false,
})

/* GET Default Page */
router.get('/', function (req, res) {
  res.status(200).send({ status: 200, message: 'Auth API is working' })
})

/* GET users listing. */
router.get('/validate', requireAuth, function (req, res) {
  console.log('/validate route ran')
  res.send({
    user: req.user.email,
  })
})

// Login user
router.post('/login', requireSignIn, Authentication.login)

// Register user
router.post('/signup', Authentication.signup)

module.exports = router
