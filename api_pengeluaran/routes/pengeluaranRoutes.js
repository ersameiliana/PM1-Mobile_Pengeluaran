// routes/pengeluaranRoutes.js
import { Router } from 'express';
import { pengeluaranController } from '../controllers/pengeluaranController.js';

const router = Router();

// GET /api/pengeluaran -> Daftar semua pengeluaran (search / filter)
router.get('/', pengeluaranController.getSemua);

// GET /api/pengeluaran/:id -> Detail pengeluaran berdasarkan ID
router.get('/:id', pengeluaranController.getDetail);

// POST /api/pengeluaran -> Tambah pengeluaran baru
router.post('/', pengeluaranController.tambah);

// PUT /api/pengeluaran/:id -> Ubah pengeluaran
router.put('/:id', pengeluaranController.ubah);

// DELETE /api/pengeluaran/:id -> Hapus pengeluaran
router.delete('/:id', pengeluaranController.hapus);

export default router;
