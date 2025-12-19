const db = require("../db/connection");

module.exports = {
  getAll: () => db.query("SELECT * FROM pretest"),

  getById: (id) => db.query("SELECT * FROM pretest WHERE id = ?", [id]),

  create: (data) => db.query("INSERT INTO pretest SET ?", data),

  update: (id, data) =>
    db.query("UPDATE pretest SET ? WHERE id = ?", [data, id]),

  delete: (id) => db.query("DELETE FROM pretest WHERE id = ?", [id]),
};
