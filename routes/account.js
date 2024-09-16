const express = require("express");
const router = express.Router();
const {viewPassbook } = require("../controllers/account");

router.get("/viewPassbook/:username", viewPassbook);


module.exports = router;