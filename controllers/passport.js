const LocalStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const UserPro = require("../model/UserPro")


module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      UserPro.findOne({ email: email })
        .then(user => {
          if(!user) {
            return done(null, false, { message: "Email not found"})
            console.log("Email not found")
          }
          console.log("Email found")
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err) throw err

            if(isMatch) {
              console.log("passowrd match")
              return done(null, user)
            } else {
              return done(null, false, { message: "Password do not match"})
              console.log("passwords do not match")
            }
          })
        })
        .then(err => console.log(err))
    })
    )
    
    passport.serializeUser((user, done) => {
      done(null, user.id)
    })
    
    passport.deserializeUser((id, done) => {
      UserPro.findById(id, (err, user) => {
        done(err, user)
      })
    })
}