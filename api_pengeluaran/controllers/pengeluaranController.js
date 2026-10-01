// controllers/pengeluaranController.js
import { PengeluaranModel } from '../models/pengeluaranModel.js';

export const pengeluaranController = {
  // GET /api/pengeluaran (dukung query ?search= & ?id_kategori=)
  async getSemua(req, res, next) {
    try {
      const { search, id_kategori } = req.query;
      const data = await PengeluaranModel.getAll({ search, id_kategori });
      const summary = await PengeluaranModel.getSummary();

      res.status(200).json({
        sukses: true,
        pesan: 'Berhasil mengambil daftar pengeluaran',
        summary,
        total_data: data.length,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/pengeluaran/:id
  async getDetail(req, res, next) {
    try {
      const { id } = req.params;
      const data = await PengeluaranModel.getById(id);

      if (!data) {
        return res.status(404).json({
          sukses: false,
          pesan: `Catatan pengeluaran dengan ID ${id} tidak ditemukan`
        });
      }

      res.status(200).json({
        sukses: true,
        pesan: 'Berhasil mengambil detail pengeluaran',
        data
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/pengeluaran
  async tambah(req, res, next) {
    try {
      const { judul, nominal, tanggal, catatan, id_kategori } = req.body;

      if (!judul || !judul.trim()) {
        return res.status(400).json({
          sukses: false,
          pesan: 'Judul pengeluaran wajib diisi'
        });
      }

      if (nominal === undefined || nominal === null || isNaN(Number(nominal)) || Number(nominal) < 0) {
        return res.status(400).json({
          sukses: false,
          pesan: 'Nominal harus berupa angka valid dan bernilai positif'
        });
      }

      const dataBaru = await PengeluaranModel.create({
        judul: judul.trim(),
        nominal: Number(nominal),
        tanggal,
        catatan: catatan ? catatan.trim() : null,
        id_kategori
      });

      res.status(201).json({
        sukses: true,
        pesan: 'Berhasil menambahkan catatan pengeluaran baru',
        data: dataBaru
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/pengeluaran/:id
  async ubah(req, res, next) {
    try {
      const { id } = req.params;
      const { judul, nominal, tanggal, catatan, id_kategori } = req.body;

      if (!judul || !judul.trim()) {
        return res.status(400).json({
          sukses: false,
          pesan: 'Judul pengeluaran wajib diisi'
        });
      }

      if (nominal === undefined || nominal === null || isNaN(Number(nominal)) || Number(nominal) < 0) {
        return res.status(400).json({
          sukses: false,
          pesan: 'Nominal harus berupa angka valid dan bernilai positif'
        });
      }

      const dataTerupdate = await PengeluaranModel.update(id, {
        judul: judul.trim(),
        nominal: Number(nominal),
        tanggal,
        catatan: catatan ? catatan.trim() : null,
        id_kategori
      });

      if (!dataTerupdate) {
        return res.status(404).json({
          sukses: false,
          pesan: `Pengeluaran dengan ID ${id} tidak ditemukan`
        });
      }

      res.status(200).json({
        sukses: true,
        pesan: 'Berhasil memperbarui catatan pengeluaran',
        data: dataTerupdate
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/pengeluaran/:id
  async hapus(req, res, next) {
    try {
      const { id } = req.params;
      const terhapus = await PengeluaranModel.delete(id);

      if (!terhapus) {
        return res.status(404).json({
          sukses: false,
          pesan: `Pengeluaran dengan ID ${id} tidak ditemukan`
        });
      }

      res.status(200).json({
        sukses: true,
        pesan: 'Berhasil menghapus catatan pengeluaran',
        id: Number(id)
      });
    } catch (error) {
      next(error);
    }
  }
};
