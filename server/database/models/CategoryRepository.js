const AbstractRepository = require("./AbstractRepository");

class CategoryRepository extends AbstractRepository {
  constructor() {
    super({ table: "category" });
  }

  async create(category) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, parent_id) VALUES (?, ?)`,
      [category.name, category.parentId || null]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async readWithProduct(id, limit = 5) {
    const [rows] = await this.database.query(
      `
      SELECT ${this.table}.*, product.id AS productId, product.title AS productTitle, product.image AS productImage
      FROM ${this.table}
      INNER JOIN product ON ${this.table}.id = product.category_id
      WHERE ${this.table}.id = ? ORDER BY RAND() LIMIT ?`,
      [id, limit]
    );

    const response = {
      id: rows[0].id,
      name: rows[0].name,
      products: [],
    };

    rows.forEach((row) => {
      response.products.push({
        id: row.productId,
        title: row.productTitle,
        image: row.productImage,
      });
    });
    return response;
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async update(category) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, parent_id = ? WHERE id = ?`,
      [category.name, category.parentId || null, category.id]
    );
    return result.affectedRows;
  }
}

module.exports = CategoryRepository;
