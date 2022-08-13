const express = require("express")
const router = express.Router()
const { beAuth } = require("../middleware/auth")
const logout = require("../controllers/logout")

router.get("/", beAuth, logout)

module.exports = router