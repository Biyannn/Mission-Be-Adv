const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Routes =====
app.use("/kategoriKelas", require("./project/routes/kategoriKelas.route"));
app.use("/kelasSaya", require("./project/routes/kelasSaya.route"));
app.use("/material", require("./project/routes/material.route"));
app.use("/modulKelas", require("./project/routes/modulKelas.route"));
app.use("/orders", require("./project/routes/orders.route"));
app.use("/pembayaran", require("./project/routes/pembayaran.route"));
app.use("/pretest", require("./project/routes/pretest.route"));
app.use("/produkKelas", require("./project/routes/produkKelas.route"));
app.use("/review", require("./project/routes/review.route"));
app.use("/tutor", require("./project/routes/tutor.route"));
app.use("/user", require("./project/routes/user.route"));
app.use("/auth", require("./project/routes/auth.route"));
app.use("/upload", require("./project/routes/upload.route"));

// Static folder for uploads
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);



// ===== Test Endpoint =====
app.get("/", (req, res) => {
  res.send("Server running...");
});

// ===== Protected Endpoint =====
const authMiddleware = require("./project/middlewares/auth.middleware");
app.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

// ===== Server =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
