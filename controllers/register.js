const bcrypt = require("bcryptjs")
const regEx = require("../config/regEx")
const UserPro = require("../model/UserPro")
const badReq = require("../errors/badReq")

const register = async (req, res) => {
  const { username, email, password, password2 } = req.body
  if(!username || !email || !password || !password2) throw new badReq("Fill the form completely")
  const match = regEx.test(email)
  if(!match) throw new badReq("Enter a valid email")
  const foundUser = await UserPro.findOne({ email }).exec()
  if(foundUser) return res.status(409).json({ msg: "Email already used" })
  if(password !== password2) throw new badReq("Password do not match")
  const hashPwd = await bcrypt.hash(password, 10)
  const result = await UserPro.create({ 
    username: username,
    email: email,
    password: hashPwd
  })
  res.status(201).json({ msg: `New user ${username} created`})
  console.log(result)
}

module.exports =  register 