const db = require('../db/connection');

module.exports = {
    getAll: () => db.query('SELECT * FROM orders'),

    getById: (id) => db.query('SELECT * FROM orders WHERE id = ?', [id]),

    create: (data) => db.query('INSERT INTO orders SET ?', data),

    update: (id, data) => db.query('UPDATE orders SET ? WHERE id = ?', [data, id]),

    delete: (id) => db.query('DELETE FROM orders WHERE id = ?', [id]),
}