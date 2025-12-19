const db = require('../db/connection');

module.exports = {
    getAll: () => db.query('SELECT * FROM pembayaran'),

    getById: (id) => db.query('SELECT * FROM pembayaran WHERE id = ?', [id]),

    create: (data) => db.query('INSERT INTO pembayaran SET ?', data),

    update: (id, data) => db.query('UPDATE pembayaran SET ? WHERE id = ?', [data, id]),

    delete: (id) => db.query('DELETE FROM pembayaran WHERE id = ?', [id]),
}