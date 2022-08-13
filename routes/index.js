const express = require("express")
const router = express.Router()
const index = require("../controllers/index")
const { beAuth } = require("../middleware/auth")

router.get("/", beAuth, index)

module.exports = router