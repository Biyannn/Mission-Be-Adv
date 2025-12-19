const model = require('../models/pretest.model');

module.exports = {
    getAll: () => model.getAll(),
    getById: (id) => model.getById(id),
    create: (data) => model.create(data),
    update: (id, data) => model.update(id, data),
    delete: (id) => model.delete(id),
}