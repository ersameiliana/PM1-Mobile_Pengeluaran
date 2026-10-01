// controllers/kategoriController.js
import { KategoriModel } from '../models/kategoriModel.js';

export const kategoriController = {
  // GET /api/kategori
  async getKategori(req, res, next) {
    try {
      const data = await KategoriModel.getAll();
      res.status(200).json({
        sukses: true,
        pesan: 'Berhasil mengambil daftar kategori',
        data
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/kategori
  async tambahKategori(req, res, next) {
    try {
      const { nama } = req.body;
      if (!nama || !nama.trim()) {
        return res.status(400).json({
          sukses: false,
          pesan: 'Nama kategori wajib diisi'
        });
      }

      const kategoriBaru = await KategoriModel.create(nama.trim());
      res.status(201).json({
        sukses: true,
        pesan: 'Kategori berhasil ditambahkan',
        data: kategoriBaru
      });
    } catch (error) {
      next(error);
    }
  }
};
