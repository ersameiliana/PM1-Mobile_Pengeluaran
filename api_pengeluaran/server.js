// server.js - Entry point backend MVC api_pengeluaran
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import pengeluaranRoutes from './routes/pengeluaranRoutes.js';
import kategoriRoutes from './routes/kategoriRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares dasar
app.use(cors());
app.use(express.json());

// Check Health Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API Pengeluaran running smoothly' });
});

// Mounting Router MVC (Dukungan /api/... dan langsung /pengeluaran)
app.use('/api/pengeluaran', pengeluaranRoutes);
app.use('/api/kategori', kategoriRoutes);

// Compatibility alias routes
app.use('/pengeluaran', pengeluaranRoutes);
app.use('/kategori', kategoriRoutes);

// Handling 404 Route Not Found
app.use((req, res) => {
  res.status(404).json({
    sukses: false,
    pesan: `Route ${req.originalUrl} tidak ditemukan`
  });
});

// Global Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server Backend (MVC) berjalan di http://localhost:${PORT}`);
});