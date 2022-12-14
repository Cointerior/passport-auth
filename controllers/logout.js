const logout = (req, res, next) => {
  req.logout(function(err) {
    if(err) {
      return next(err)
    }
    res.redirect("/login")
  })
}

module.exports = logout