module.exports = {
  beAuth: function(req, res, next) {
    if(req.isAuthenticated()) {
      return next()
    }
    res.redirect("/login")
  }
}