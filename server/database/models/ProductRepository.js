const AbstractRepository = require("./AbstractRepository");

class ProductRepository extends AbstractRepository {
  constructor() {
    super({ table: "product" });
  }

  async create(product) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (category_id, title, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        product.category_id || null,
        product.title,
        product.description,
        product.price,
        product.stock,
        product.image_url || null,
      ]
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

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async update(product) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET category_id = ?, title = ?, description = ?, price = ?, stock = ?, image_url = ? WHERE id = ?`,
      [
        product.category_id,
        product.title,
        product.description,
        product.price,
        product.stock,
        product.image_url || null,
        product.id,
      ]
    );
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = ProductRepository;
