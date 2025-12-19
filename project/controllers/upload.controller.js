const kategoriKelasModel = require("../models/kategoriKelas.model");
const path = require("path");
const fs = require("fs");

exports.uploadKategoriImage = async (req, res) => {
  try {
    // 1️⃣ cek file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File tidak ditemukan",
      });
    }

    // 2️⃣ cek kategori_id
    const { kategori_id } = req.body;
    if (!kategori_id) {
      return res.status(400).json({
        success: false,
        message: "kategori_id diperlukan",
      });
    }

    // 3️⃣ pastikan kategori ADA
    const [rows] = await kategoriKelasModel.getById(kategori_id);
    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }

    // 4️⃣ simpan path image
    const imagePath = `/uploads/${req.file.filename}`;

    // 5️⃣ update database
    const [result] = await kategoriKelasModel.update(kategori_id, {
      image: imagePath,
    });

    return res.status(200).json({
      success: true,
      message: "Image berhasil diupload",
      image: imagePath,
    });
  } catch (err) {
    console.error("UPLOAD ERROR DETAIL:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteKategoriImage = async (req, res) => {
  try {
    const { kategori_id } = req.params;

    // 1️⃣ cek kategori
    const [rows] = await kategoriKelasModel.getById(kategori_id);
    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }

    const kategori = rows[0];

    // 2️⃣ cek image
    if (!kategori.image) {
      return res.status(400).json({
        success: false,
        message: "Kategori tidak memiliki image",
      });
    }

    // 3️⃣ hapus file fisik
     const filePath = path.join(
      process.cwd(),
      "uploads",
      path.basename(kategori.image)
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // 4️⃣ update DB → NULL
    await kategoriKelasModel.update(kategori_id, {
      image: null,
    });

    return res.status(200).json({
      success: true,
      message: "Image berhasil dihapus",
    });
  } catch (err) {
    console.error("DELETE IMAGE ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
