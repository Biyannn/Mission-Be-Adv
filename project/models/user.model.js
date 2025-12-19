const db = require("../db/connection");

module.exports = {
  getAll: () => db.query("SELECT * FROM user"),

  getById: (id) => db.query("SELECT * FROM user WHERE id = ?", [id]),

  findByVerificationToken: (token) =>
    db.query("SELECT * FROM user WHERE verification_token = ?", [token]),

  findByEmail: (email) =>
    db.query("SELECT * FROM user WHERE email = ?", [email]),

  // optional: raw query helper
  _rawQuery: (sql, params) => db.query(sql, params),

  create: (data) => db.query("INSERT INTO user SET ?", data),

  update: (id, data) => {
  const fields = Object.keys(data)
    .map(key => `${key} = ?`)
    .join(", ");

  const values = [...Object.values(data), id];

  const sql = `UPDATE user SET ${fields} WHERE id = ?`;

  return db.query(sql, values);
},

  delete: (id) => db.query("DELETE FROM user WHERE id = ?", [id]),
};
