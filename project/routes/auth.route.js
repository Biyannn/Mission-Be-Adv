const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify", authController.verify);

// optional: resend verification
router.post("/resend-verification", authController.resendVerification); // implement di controller/service jika mau

module.exports = router;
