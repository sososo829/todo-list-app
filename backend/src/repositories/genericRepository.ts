import pool from '../config/db';

export class GenericRepository<T> {
  constructor(private tableName: string) {}

  async getAll(): Promise<T[]> {
    const result = await pool.query(`SELECT * FROM ${this.tableName}`);
    return result.rows;
  }

  async getById(id: string): Promise<T | null> {
    const result = await pool.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
    return result.rows[0] || null;
  }

  async create(fields: Partial<T>): Promise<T> {
    const keys = Object.keys(fields).join(', ');
    const values = Object.values(fields);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

    const result = await pool.query(
      `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    return result.rows[0];
  }

  async update(id: string, fields: Partial<T>): Promise<T | null> {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const updates = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');

    const result = await pool.query(
      `UPDATE ${this.tableName} SET ${updates} WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await pool.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
    return (result as { rowCount: number }).rowCount > 0;
  }
}
