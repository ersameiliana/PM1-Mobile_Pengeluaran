// SECTION: Model Service - API Client ke Backend api_pengeluaran
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// URL Backend Express (Otomatis sesuaikan host Android Emulator / Web / Localhost / Physical Device)
const getBaseUrl = () => {
  // Detect IP from Expo Bundler for physical devices over LAN
  const hostUri = Constants?.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(':')[0];
    return `http://${ip}:3000/api`;
  }

  // Fallback for emulator / web
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000/api'; // Android Emulator
  }
  return 'http://localhost:3000/api'; // Web & iOS
};

const BASE_URL = getBaseUrl();

// Data fallback default jika backend MySQL belum dinyalakan
const MOCK_KATEGORI = [
  { id: 1, nama: 'Pendidikan' },
  { id: 2, nama: 'Makanan' },
  { id: 3, nama: 'Transportasi' },
  { id: 4, nama: 'Lainnya' }
];

const MOCK_PENGELUARAN = [
  {
    id: 1,
    judul: 'Makan siang nasi goreng',
    nominal: 20000,
    tanggal: '2026-03-02',
    catatan: 'Makan siang bareng teman kantor',
    id_kategori: 2,
    nama_kategori: 'Makanan'
  },
  {
    id: 2,
    judul: 'Bensin Motor',
    nominal: 15000,
    tanggal: '2026-03-01',
    catatan: 'Isi Pertalite full tank',
    id_kategori: 3,
    nama_kategori: 'Transportasi'
  },
  {
    id: 3,
    judul: 'Buku Catatan Kuliah',
    nominal: 25000,
    tanggal: '2026-02-28',
    catatan: 'Buku kampus Gramedia',
    id_kategori: 1,
    nama_kategori: 'Pendidikan'
  }
];

export const PengeluaranService = {
  // Ambil daftar pengeluaran (search & filter kategori)
  async getSemua({ search = '', id_kategori = '' } = {}) {
    try {
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (id_kategori) query.append('id_kategori', id_kategori);

      const res = await fetch(`${BASE_URL}/pengeluaran?${query.toString()}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      return data;
    } catch (error) {
      console.warn('⚠️ Gagal terhubung ke Backend Server, menggunakan data lokal (Mock):', error.message);
      // Filter mock lokal
      let filtered = [...MOCK_PENGELUARAN];
      if (search) {
        filtered = filtered.filter(p => 
          p.judul.toLowerCase().includes(search.toLowerCase()) || 
          (p.catatan && p.catatan.toLowerCase().includes(search.toLowerCase()))
        );
      }
      if (id_kategori) {
        filtered = filtered.filter(p => String(p.id_kategori) === String(id_kategori));
      }
      const totalNominal = filtered.reduce((acc, curr) => acc + Number(curr.nominal), 0);
      return {
        sukses: true,
        summary: { total_pengeluaran: totalNominal, total_transaksi: filtered.length },
        total_data: filtered.length,
        data: filtered
      };
    }
  },

  // Ambil daftar kategori
  async getKategori() {
    try {
      const res = await fetch(`${BASE_URL}/kategori`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      return data;
    } catch (error) {
      return { sukses: true, data: MOCK_KATEGORI };
    }
  },

  // Tambah catatan baru
  async tambah(data) {
    try {
      const res = await fetch(`${BASE_URL}/pengeluaran`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.pesan || 'Gagal menyimpan data');
      return result;
    } catch (error) {
      // Fallback lokal tambah
      const newItem = {
        id: Date.now(),
        judul: data.judul,
        nominal: Number(data.nominal),
        tanggal: data.tanggal || new Date().toISOString().split('T')[0],
        catatan: data.catatan || '',
        id_kategori: data.id_kategori,
        nama_kategori: MOCK_KATEGORI.find(k => k.id == data.id_kategori)?.nama || 'Lainnya'
      };
      MOCK_PENGELUARAN.unshift(newItem);
      return { sukses: true, data: newItem };
    }
  },

  // Update catatan
  async ubah(id, data) {
    try {
      const res = await fetch(`${BASE_URL}/pengeluaran/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.pesan || 'Gagal mengupdate data');
      return result;
    } catch (error) {
      const index = MOCK_PENGELUARAN.findIndex(p => p.id == id);
      if (index !== -1) {
        MOCK_PENGELUARAN[index] = {
          ...MOCK_PENGELUARAN[index],
          judul: data.judul,
          nominal: Number(data.nominal),
          catatan: data.catatan,
          id_kategori: data.id_kategori,
          nama_kategori: MOCK_KATEGORI.find(k => k.id == data.id_kategori)?.nama || 'Lainnya'
        };
      }
      return { sukses: true, data: MOCK_PENGELUARAN[index] };
    }
  },

  // Hapus catatan
  async hapus(id) {
    try {
      const res = await fetch(`${BASE_URL}/pengeluaran/${id}`, {
        method: 'DELETE'
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.pesan || 'Gagal menghapus data');
      return result;
    } catch (error) {
      const idx = MOCK_PENGELUARAN.findIndex(p => p.id == id);
      if (idx !== -1) MOCK_PENGELUARAN.splice(idx, 1);
      return { sukses: true, id };
    }
  }
};
