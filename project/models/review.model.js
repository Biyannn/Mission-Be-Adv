const db = require("../db/connection");

module.exports = {
  getAll: () => db.query("SELECT * FROM review"),

  getById: (id) => db.query("SELECT * FROM review WHERE id = ?", [id]),

  create: (data) => db.query("INSERT INTO review SET ?", data),

  update: (id, data) =>
    db.query("UPDATE review SET ? WHERE id = ?", [data, id]),

  delete: (id) => db.query("DELETE FROM review WHERE id = ?", [id]),
};
