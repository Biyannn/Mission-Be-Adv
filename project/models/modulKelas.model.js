const db = require('../db/connection');

module.exports = {
    getAll: () => db.query('SELECT * FROM modul_kelas'),

    getById: (id) => db.query('SELECT * FROM modul_kelas WHERE id = ?', [id]),

    create: (data) => db.query('INSERT INTO modul_kelas SET ?', data),

    update: (id, data) => db.query('UPDATE modul_kelas SET ? WHERE id = ?', [data, id]),

    delete: (id) => db.query('DELETE FROM modul_kelas WHERE id = ?', [id]),
}