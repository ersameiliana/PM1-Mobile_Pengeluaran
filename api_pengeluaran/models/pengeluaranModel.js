// models/pengeluaranModel.js
import { pool } from '../config/db.js';

export const PengeluaranModel = {
  // Ambil semua data pengeluaran (bisa filter kata kunci pencarian & id_kategori)
  async getAll({ search, id_kategori } = {}) {
    let sql = `
      SELECT 
        p.id, 
        p.judul, 
        p.nominal, 
        p.tanggal, 
        p.catatan, 
        p.id_kategori,
        p.dibuat_pada,
        k.nama AS nama_kategori
      FROM pengeluaran p
      LEFT JOIN kategori k ON p.id_kategori = k.id
    `;
    const params = [];
    const conditions = [];

    if (search) {
      conditions.push('(p.judul LIKE ? OR p.catatan LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    if (id_kategori) {
      conditions.push('p.id_kategori = ?');
      params.push(id_kategori);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY p.tanggal DESC, p.id DESC';

    const [rows] = await pool.query(sql, params);
    return rows;
  },

  // Ambil detail satu pengeluaran berdasarkan ID
  async getById(id) {
    const sql = `
      SELECT 
        p.id, 
        p.judul, 
        p.nominal, 
        p.tanggal, 
        p.catatan, 
        p.id_kategori,
        p.dibuat_pada,
        k.nama AS nama_kategori
      FROM pengeluaran p
      LEFT JOIN kategori k ON p.id_kategori = k.id
      WHERE p.id = ?
    `;
    const [rows] = await pool.query(sql, [id]);
    return rows[0] || null;
  },

  // Tambah data pengeluaran baru
  async create({ judul, nominal, tanggal, catatan, id_kategori }) {
    const sql = `
      INSERT INTO pengeluaran (judul, nominal, tanggal, catatan, id_kategori)
      VALUES (?, ?, COALESCE(?, CURRENT_DATE), ?, ?)
    `;
    const values = [
      judul,
      Number(nominal),
      tanggal || null,
      catatan || null,
      id_kategori ? Number(id_kategori) : null
    ];

    const [result] = await pool.query(sql, values);
    return this.getById(result.insertId);
  },

  // Update data pengeluaran berdasarkan ID
  async update(id, { judul, nominal, tanggal, catatan, id_kategori }) {
    const sql = `
      UPDATE pengeluaran 
      SET 
        judul = ?, 
        nominal = ?, 
        tanggal = COALESCE(?, tanggal), 
        catatan = ?, 
        id_kategori = ?
      WHERE id = ?
    `;
    const values = [
      judul,
      Number(nominal),
      tanggal || null,
      catatan || null,
      id_kategori ? Number(id_kategori) : null,
      id
    ];

    const [result] = await pool.query(sql, values);
    if (result.affectedRows === 0) return null;
    return this.getById(id);
  },

  // Hapus data pengeluaran berdasarkan ID
  async delete(id) {
    const [result] = await pool.query('DELETE FROM pengeluaran WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  // Hitung ringkasan total nominal pengeluaran
  async getSummary() {
    const [rows] = await pool.query(
      'SELECT SUM(nominal) AS total_pengeluaran, COUNT(id) AS total_transaksi FROM pengeluaran'
    );
    return rows[0] || { total_pengeluaran: 0, total_transaksi: 0 };
  }
};
