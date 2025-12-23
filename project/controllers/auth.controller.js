const authService = require("../services/auth.service");
const userModel = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");
const mailService = require("../services/mail.service");

/**
 * REGISTER
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "name, email, password diperlukan",
      });
    }

    const newUser = await authService.register({ name, email, password });

    // 🔐 EMAIL = SIDE EFFECT (TIDAK BOLEH GAGALKAN REGISTER)
    if (process.env.NODE_ENV !== "production") {
      try {
        await mailService.sendVerificationEmail(
          newUser.email,
          newUser.name,
          newUser.verification_token
        );
      } catch (mailError) {
        console.warn("⚠️ Email gagal dikirim:", mailError.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: "User terdaftar. Silakan cek email untuk verifikasi akun.",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

/**
 * LOGIN
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email dan password diperlukan",
      });
    }

    const data = await authService.login({ email, password });

    return res.status(200).json({
      success: true,
      message: "Login berhasil",
      data,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

/**
 * VERIFY EMAIL
 */
exports.verify = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token diperlukan",
      });
    }

    const [rows] = await userModel.findByVerificationToken(token);
    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Invalid verification token",
      });
    }

    const user = rows[0];
    await userModel.update(user.id, {
      is_verified: 1,
      verification_token: null,
    });

    return res.status(200).json({
      success: true,
      message: "Email berhasil diverifikasi",
    });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * RESEND VERIFICATION
 */
exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "email diperlukan",
      });
    }

    const [rows] = await userModel.findByEmail(email);
    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = rows[0];
    if (user.is_verified === 1) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    const token = uuidv4();
    await userModel.update(user.id, { verification_token: token });

    if (process.env.NODE_ENV !== "production") {
      try {
        await mailService.sendVerificationEmail(email, user.name, token);
      } catch (mailError) {
        console.warn("⚠️ Resend email gagal:", mailError.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Verification email resent",
    });
  } catch (err) {
    console.error("RESEND ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
