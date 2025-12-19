const model = require("../models/kategoriKelas.model");

module.exports = {
  getAll: (query) => {
    let where = [];
    let values = [];

    // SEARCH
    if (query.search) {
      where.push("nama_kategori LIKE ?");
      values.push(`%${query.search}%`);
    }

    // FILTER (contoh pakai id)
    if (query.id) {
      where.push("id = ?");
      values.push(query.id);
    }

    let whereClause = "";
    if (where.length) {
      whereClause = "WHERE " + where.join(" AND ");
    }

    // SORT
    let orderBy = "";
    if (query.sort) {
      const order =
        query.order && query.order.toUpperCase() === "DESC" ? "DESC" : "ASC";

      orderBy = `ORDER BY ${query.sort} ${order}`;
    }

    return model.getAll(whereClause, orderBy, values);
  },

  getById: (id) => model.getById(id),
  create: (data) => model.create(data),
  update: (id, data) => model.update(id, data),
  delete: (id) => model.delete(id),
};
