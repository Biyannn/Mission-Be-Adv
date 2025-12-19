const db = require('../db/connection');

module.exports = {
    getAll: () => db.query('SELECT * FROM material'),

    getById: (id) => db.query('SELECT * FROM material WHERE id = ?', [id]),

    create: (data) => db.query('INSERT INTO material SET ?', data),

    update: (id, data) => db.query('UPDATE material SET ? WHERE id = ?', [data, id]),

    delete: (id) => db.query('DELETE FROM material WHERE id = ?', [id]),
}