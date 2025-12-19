const service = require("../services/kelasSaya.service");

module.exports = {
  // GET /kelasSaya
  getAll: async (req, res) => {
    try {
      const [rows] = await service.getAll();
      return res.status(200).json({
        success: true,
        message: "Categories fetched successfully",
        data: rows,
      });
    } catch (err) {
      console.error("GET ALL ERROR", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },

  // GET /kelasSaya/:id
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const [rows] = await service.getById(id);
      if (!rows.length) return res.status(404).json({ success: false, message: "Category not found" });
      return res.status(200).json({
        success: true,
        message: "Category fetched successfully",
        data: rows[0],
      });
    } catch (err) {
      console.error("GET BY ID ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // POST /kelasSaya
  create: async (req, res) => {
    try {
      const payload = req.body;
      const [result] = await service.create(payload);

      return res.status(201).json({
        success: true,
        message: "Category created successfully",
        id: result.insertId,
      });

    } catch (err) {
      console.error("CREATE ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // PUT /kelasSaya/:id
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const payload = req.body;
      const [result] = await service.update(id, payload);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
      });

    } catch (err) {
      console.error("UPDATE ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // DELETE /kelasSaya/:id
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const [result] = await service.delete(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });

    } catch (err) {
      console.error("DELETE ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};
