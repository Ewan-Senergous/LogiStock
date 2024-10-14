const AbstractRepository = require("./AbstractRepository");

class CustomerRepository extends AbstractRepository {
  constructor() {
    super({ table: "customer" });
  }

  async create(customer) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (username, fullname, email, password, phoneNumber, role) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        customer.username,
        customer.fullname,
        customer.email,
        customer.password,
        customer.phoneNumber,
        customer.role,
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

  async update(customer) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET username = ?, fullname = ?, email = ?, phoneNumber = ?, role = ? WHERE id = ?`,
      [
        customer.username,
        customer.fullname,
        customer.email,
        customer.phoneNumber,
        customer.role,
        customer.id,
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

module.exports = CustomerRepository;
