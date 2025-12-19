const db = require("../db/connection");

module.exports = {
  getAll: () => db.query("SELECT * FROM tutor"),

  getById: (id) => db.query("SELECT * FROM tutor WHERE id = ?", [id]),

  create: (data) => db.query("INSERT INTO tutor SET ?", data),

  update: (id, data) =>
    db.query("UPDATE tutor SET ? WHERE id = ?", [data, id]),

  delete: (id) => db.query("DELETE FROM tutor WHERE id = ?", [id]),
};
