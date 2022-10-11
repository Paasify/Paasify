const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local')
// const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs')
const handlers = require('./handlers')

// const Prisma = new PrismaClient();

// const localOptions = {usernameField: 'email'}
const localLogin = new LocalStrategy(function (username, password, done) {
  // await Prisma.user.findOne({
  //         where: {
  //             username: username,
  //         },
  //     }).then(async user => {
  //         if (!user) {
  //             return done(null, false);
  //         }
  //         const isMatch = await bcrypt.compare(password, user.password);
  //         if (!isMatch) {
  //             return done(null, false);
  //         }
  //         return done(null, user);
  //     })
  const user = handlers.getUserWithUsername(username)
  if (!user) {
    return done(null, false)
  }
  const isMatch = bcrypt.compare(password, user.password)
  if (!isMatch) {
    return done(null, false)
  }
  return done(null, user)
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET,
}

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  const user = handlers.getUserWithId(payload.sub)
  if (user) {
    return done(null, true)
  } else {
    done(null, false)
  }
})

passport.use(jwtLogin)
passport.use(localLogin)
