// models/kategoriModel.js
import { pool } from '../config/db.js';

export const KategoriModel = {
  // Ambil semua daftar kategori
  async getAll() {
    const [rows] = await pool.query(
      'SELECT id, nama FROM kategori ORDER BY nama ASC'
    );
    return rows;
  },

  // Ambil kategori berdasarkan ID
  async getById(id) {
    const [rows] = await pool.query(
      'SELECT id, nama FROM kategori WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  // Tambah kategori baru
  async create(nama) {
    const [result] = await pool.query(
      'INSERT INTO kategori (nama) VALUES (?)',
      [nama]
    );
    return { id: result.insertId, nama };
  }
};
