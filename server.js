require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const session = require("express-session")
const helmet = require("helmet")
const mongoose = require("mongoose")
const UserPro = require("./model/UserPro")
const xss = require("xss-clean")
const cookieParser = require("cookie-parser")
require("express-async-errors")
const errorHandler = require("./errors/errorHandler")
const notFound = require("./middleware/notFound")
const passport = require("passport")
require("./controllers/passport")(passport)
const connectDB = require("./db/dbconn")

const PORT = process.env.PORT || 3500

app.use(cors())
app.use(helmet())
app.use(xss())

connectDB()

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(session({
  secret: "secret",
  saveUninitialized: true,
  resave: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  console.log(req.session)
  console.log(req.user)
  next()
})

app.use("/", require("./routes/home"))
app.use("/index", require("./routes/index"))
app.use("/register", require("./routes/register"))
app.use("/login", require("./routes/login"))
app.use("/logout", require("./routes/logout"))

app.use(notFound)
//app.use(errorHandler)


mongoose.connection.once("open", () => {
  console.log("connected to db")
  app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
}) 