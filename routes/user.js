const express = require("express");
const router = express.Router();
const {forgotPassword, handleUserLogin, userCreate, validateOtp, passwordGeneration} = require("../controllers/user")

router.post("/forgot", forgotPassword);
router.post("/validateOtp", validateOtp);
router.post("/passwordGeneration", passwordGeneration)
router.post("/login", handleUserLogin);
router.post("/create", userCreate)

module.exports = router;