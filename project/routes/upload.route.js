const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const uploadController = require("../controllers/upload.controller");

router.post(
  "/kategori",
  authMiddleware,
  upload.single("image"),
  uploadController.uploadKategoriImage
);

// DELETE image kategori
router.delete(
  "/kategori/:kategori_id",
  authMiddleware,
  uploadController.deleteKategoriImage
);

module.exports = router;
