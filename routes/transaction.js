const express = require("express");
const router = express.Router();
const {sendMoney } = require("../controllers/transaction");

router.post("/sendmoney", sendMoney);


module.exports = router;