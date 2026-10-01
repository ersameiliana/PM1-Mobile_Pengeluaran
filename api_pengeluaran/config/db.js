// config/db.js
import mysql from 'mysql2/promise';
import 'dotenv/config';

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'db_pengeluaran',
  waitForConnections: true,
  connectionLimit: 10,
});

// Uji koneksi basis data
try {
  const conn = await pool.getConnection();
  console.log('✅ Terhubung ke basis data MySQL (db_pengeluaran)');
  conn.release();
} catch (error) {
  console.error('❌ Gagal terhubung ke basis data:', error.message);
}
