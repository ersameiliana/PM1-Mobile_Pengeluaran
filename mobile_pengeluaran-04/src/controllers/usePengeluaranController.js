// SECTION: Controller - Logika Bisnis & State Management Frontend MVC
import { useState, useEffect, useCallback } from 'react';
import { PengeluaranService } from '../services/api';

export function usePengeluaranController() {
  // State Utama Data
  const [pengeluaranList, setPengeluaranList] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [summary, setSummary] = useState({ total_pengeluaran: 0, total_transaksi: 0 });
  const [loading, setLoading] = useState(false);

  // State Filter & Navigasi
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedKategoriId, setSelectedKategoriId] = useState(null);
  const [activeTab, setActiveTab] = useState('Beranda'); // 'Beranda' | 'Buat Catatan' | 'Riwayat Catatan'

  // State Form Modal & Confirm Alert
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null = Tambah Baru, Object = Edit Mode
  const [confirmState, setConfirmState] = useState(null); // { type: 'add'|'edit'|'delete', data: any }
  const [detailItem, setDetailItem] = useState(null);
  
  // State Notification Alert Modal ('success-add' | 'success-update' | 'success-delete' | 'success-refresh' | null)
  const [alertState, setAlertState] = useState(null);

  // Load Kategori
  const fetchKategori = useCallback(async () => {
    const res = await PengeluaranService.getKategori();
    if (res && res.sukses && Array.isArray(res.data)) {
      setKategoriList(res.data);
    }
  }, []);

  // Load Pengeluaran (dengan Search / Filter)
  const fetchPengeluaran = useCallback(async () => {
    setLoading(true);
    try {
      const res = await PengeluaranService.getSemua({
        search: debouncedSearchQuery,
        id_kategori: selectedKategoriId
      });
      if (res && res.sukses) {
        setPengeluaranList(res.data || []);
        if (res.summary) setSummary(res.summary);
      }
    } catch (err) {
      console.error('Error fetching pengeluaran:', err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchQuery, selectedKategoriId]);

  // Handle Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Initial Load
  useEffect(() => {
    fetchKategori();
  }, [fetchKategori]);

  useEffect(() => {
    fetchPengeluaran();
  }, [fetchPengeluaran]);

  // Handlers Logika Bisnis

  const handleRefresh = async () => {
    fetchPengeluaran();
    setAlertState({ type: 'refresh-success', title: 'Berhasil Muat Ulang', message: 'Data pengeluaran telah diperbarui.' });
  };

  // 2. Buka Modal Tambah Catatan Baru
  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setIsFormModalOpen(true);
  };

  // 3. Buka Modal Edit Catatan
  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setIsFormModalOpen(true);
  };

  // 4. Prompt Save Form (Validasi lewat UI)
  const handlePromptSave = (formData, isEdit) => {
    setConfirmState({
      type: isEdit ? 'edit' : 'add',
      data: formData
    });
  };

  // 5. Konfirmasi Hapus
  const handlePromptDelete = (item) => {
    setConfirmState({ type: 'delete', data: item });
  };

  // 6. Eksekusi Aksi setelah Konfirmasi (Ya)
  const handleConfirmAction = async () => {
    if (!confirmState) return;
    const { type, data } = confirmState;
    setConfirmState(null);
    setLoading(true);

    try {
      if (type === 'delete') {
        const res = await PengeluaranService.hapus(data.id);
        if (res && res.sukses) {
          await fetchPengeluaran();
          if (detailItem && detailItem.id === data.id) {
            setDetailItem(null);
          }
          setAlertState({ type: 'delete-success', title: 'Pengeluaran Dihapus', message: 'Catatan pengeluaran berhasil dihapus.' });
        }
      } else if (type === 'edit') {
        setIsFormModalOpen(false);
        const res = await PengeluaranService.ubah(editingItem.id, data);
        if (res && res.sukses) {
          await fetchPengeluaran();
          if (detailItem && detailItem.id === editingItem.id) {
            setDetailItem(res.data);
          }
          setAlertState({ type: 'update-success', title: 'Pengeluaran Diperbarui!', message: 'Catatan pengeluaran berhasil diubah.' });
        }
      } else if (type === 'add') {
        setIsFormModalOpen(false);
        const res = await PengeluaranService.tambah(data);
        if (res && res.sukses) {
          await fetchPengeluaran();
          setAlertState({ type: 'create-success', title: 'Catatan Berhasil Dibuat!', message: 'Pengeluaran baru telah tersimpan.' });
        }
      }
    } catch (error) {
      setAlertState({ type: 'error-alerts', title: 'Gagal', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return {
    pengeluaranList,
    kategoriList,
    summary,
    loading,
    searchQuery,
    setSearchQuery,
    selectedKategoriId,
    setSelectedKategoriId,
    activeTab,
    setActiveTab,
    isFormModalOpen,
    setIsFormModalOpen,
    editingItem,
    confirmState,
    setConfirmState,
    alertState,
    setAlertState,
    detailItem,
    setDetailItem,
    handleRefresh,
    handleOpenCreateModal,
    handleOpenEditModal,
    handlePromptSave,
    handlePromptDelete,
    handleConfirmAction
  };
}
