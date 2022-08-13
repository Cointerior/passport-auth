const passport = require("passport")

const login = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login"
  })(req, res, next)
}

module.exports = login