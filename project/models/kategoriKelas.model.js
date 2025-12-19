const db = require("../db/connection");

module.exports = {
  getAll: (whereClause, orderBy, values) => {
    const sql = `
    SELECT * FROM kategori_kelas
    ${whereClause}
    ${orderBy}
  `;

    return db.query(sql, values);
  },

  getById: (id) => db.query("SELECT * FROM kategori_kelas WHERE id = ?", [id]),

  create: (data) => db.query("INSERT INTO kategori_kelas SET ?", data),

  update: (id, data) =>
    db.query("UPDATE kategori_kelas SET ? WHERE id = ?", [data, id]),

  delete: (id) => db.query("DELETE FROM kategori_kelas WHERE id = ?", [id]),
};
