// routes/kategoriRoutes.js
import { Router } from 'express';
import { kategoriController } from '../controllers/kategoriController.js';

const router = Router();

// GET /api/kategori -> Ambil seluruh kategori
router.get('/', kategoriController.getKategori);

// POST /api/kategori -> Tambah kategori baru
router.post('/', kategoriController.tambahKategori);

export default router;
