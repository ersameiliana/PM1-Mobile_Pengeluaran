// middlewares/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error('SERVER ERROR LOG:', err);

  const statusCode = err.statusCode || 500;
  const pesan = err.message || 'Terjadi kesalahan pada internal server';

  res.status(statusCode).json({
    sukses: false,
    pesan,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
