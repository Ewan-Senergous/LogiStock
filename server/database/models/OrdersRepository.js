const AbstractRepository = require("./AbstractRepository");

class OrdersRepository extends AbstractRepository {
  constructor() {
    super({ table: "orders" });
  }

  async create(order) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (customer_id, payment_id, delivery_id, total_price, purchase_date) VALUES (?, ?, ?, ?, ?)`,
      [
        order.customer_id,
        order.payment_id,
        order.delivery_id,
        order.total_price,
        order.purchase_date,
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

  async update(order) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET customer_id = ?, total_price = ?, purchase_date = ? WHERE id = ?`,
      [
        order.customer_id || null,
        order.total_price,
        order.purchase_date,
        order.id,
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

module.exports = OrdersRepository;
