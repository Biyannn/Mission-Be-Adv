const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../models/user.model");
const mailService = require("./mail.service");

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

module.exports = {
  // Register: hash password lalu simpan
  async register({ name, email, password }) {
    const [existingRows] = await userModel.findByEmail(email);
    if (existingRows.length) {
      const err = new Error("Email already registered");
      err.status = 400;
      throw err;
    }

    const hashed = await bcrypt.hash(password, saltRounds);
    const payload = { name, email, password: hashed };

    const [result] = await userModel.create(payload);
    const userId = result.insertId;

    // generate verification token
    const token = uuidv4();

    // simpan token di kolom verification_token
    await userModel.update(userId, { verification_token: token });

    try {
      await mailService.sendVerificationEmail(email, name, token);
      console.log(`Sent verification email to ${email}`);
    } catch (mailErr) {
      console.error("Failed to send verification email:", mailErr);
      // keputusan: tetap return user, biarkan front-end tahu user terdaftar
    }

    // jika mau juga produce token login segera (pilihan) — kita tidak buat di sini
    return { id: userId, name, email };
  },

  // Login: verifikasi password lalu buat token
  async login({ email, password }) {
    const [rows] = await userModel.findByEmail(email);
    if (!rows.length) {
      const err = new Error("Invalid email or password");
      err.status = 404;
      throw err;
    }

    const user = rows[0];

    // optionally: check is_verified
    if (user.is_verified === 0) { //pengecekan is_verified === 0 di login — ini membuat user tidak bisa login sebelum verifikasi; kalau kamu mau tetap izinkan login walau belum verifikasi, hapus bagian itu.
      const err = new Error("Email not verified");
      err.status = 401;
      throw err;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const err = new Error("Invalid email or password");
      err.status = 401;
      throw err;
    }

    const payload = { id: user.id, name: user.name, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return { token, user: { id: user.id, name: user.name, email: user.email } };
  },
};
