const db = require('../db/connection');

module.exports = {
    getAll: () => db.query('SELECT * FROM kelas_saya'),

    getById: (id) => db.query('SELECT * FROM kelas_saya WHERE id = ?', [id]),

    create: (data) => db.query('INSERT INTO kelas_saya SET ?', data),

    update: (id, data) => db.query('UPDATE kelas_saya SET ? WHERE id = ?', [data, id]),

    delete: (id) => db.query('DELETE FROM kelas_saya WHERE id = ?', [id]),
}