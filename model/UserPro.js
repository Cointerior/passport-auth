const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserProSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  session: String
})

module.exports = mongoose.model("UserPro", UserProSchema)