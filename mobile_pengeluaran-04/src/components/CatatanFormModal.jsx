// SECTION: Form Modal Section ("create-catatan" & "update-catatan" Figma)
import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Modal, 
  StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { ArrowLeft, Type, DollarSign, Tag, Calendar, ChevronDown } from 'lucide-react-native';
import { BottomNavSection } from './BottomNavSection'; // <-- Import kembali Navbarnya
import DateTimePicker from '@react-native-community/datetimepicker';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export function CatatanFormModal({
  visible,
  onClose,
  onSubmit,
  onValidationFailed,
  editingItem = null,
  kategoriList = [],
  onChangeTab, // <-- Tambahkan props ini
  activeTab = 'Buat Catatan' // <-- Tambahkan props ini
}) {
  const [judul, setJudul] = useState('');
  const [nominal, setNominal] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [catatan, setCatatan] = useState('');
  const [idKategori, setIdKategori] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  useEffect(() => {
    if (editingItem) {
      setJudul(editingItem.judul || '');
      setNominal(String(editingItem.nominal || ''));
      setTanggal(editingItem.tanggal ? editingItem.tanggal.split('T')[0] : new Date().toISOString().split('T')[0]);
      setCatatan(editingItem.catatan || '');
      setIdKategori(editingItem.id_kategori ? String(editingItem.id_kategori) : '');
    } else {
      setJudul('');
      setNominal('');
      setTanggal(new Date().toISOString().split('T')[0]);
      setCatatan('');
      setIdKategori('');
    }
    setIsDropdownOpen(false);
  }, [editingItem, visible]);

  const handleSave = () => {
    if (!judul.trim() || !nominal || isNaN(Number(nominal)) || Number(nominal) <= 0) {
      if (onValidationFailed) onValidationFailed();
      return;
    }
    onSubmit({
      judul: judul.trim(),
      nominal: Number(nominal),
      tanggal,
      catatan: catatan.trim(),
      id_kategori: idKategori ? Number(idKategori) : null
    }, !!editingItem);
  };

  const selectedKategoriNama = kategoriList.find(k => String(k.id) === String(idKategori))?.nama || 'Pilih kategori...';

  return (
    <Modal 
      visible={visible} 
      animationType="slide" 
      transparent={false} 
      onRequestClose={onClose}
      statusBarTranslucent={true}
      hardwareAccelerated={true}
    >
      <View style={styles.container}>
        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView 
            style={{ flex: 1 }} 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.formWrapper}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.backBtn} onPress={onClose} activeOpacity={0.7}>
                <ArrowLeft size={22} color="#000" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                {editingItem ? 'Edit Catatan' : 'Buat Catatan'}
              </Text>
            </View>

            {/* Judul Catatan */}
            <Text style={styles.label}>Judul Catatan</Text>
            <View style={styles.inputRow}>
              <View style={styles.iconBox}>
                <Type size={16} color="#000000" />
              </View>
              <TextInput
                style={styles.inputBox}
                placeholder="Tulis judul catatan..."
                placeholderTextColor="#A9A9A9"
                value={judul}
                onChangeText={setJudul}
              />
            </View>

            {/* Nominal Harga */}
            <Text style={styles.label}>Masukkan Nominal Harga</Text>
            <View style={styles.inputRow}>
              <View style={styles.iconBox}>
                <DollarSign size={16} color="#000000" />
              </View>
              <TextInput
                style={styles.inputBox}
                placeholder="Contoh: 10000"
                placeholderTextColor="#A9A9A9"
                keyboardType="numeric"
                value={nominal}
                onChangeText={setNominal}
              />
            </View>

            {/* Kategori */}
            <Text style={styles.label}>Kategori</Text>
            <View style={styles.inputRow}>
              <View style={styles.iconBox}>
                <Tag size={16} color="#000000" />
              </View>
              <TouchableOpacity
                style={[styles.inputBox, { justifyContent: 'center' }]}
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                activeOpacity={0.8}
              >
                <Text style={{ color: idKategori ? '#000' : '#A9A9A9', fontSize: 14, fontFamily: 'Plus Jakarta Sans', fontWeight: '700' }}>
                  {selectedKategoriNama}
                </Text>
                <View style={{ position: 'absolute', right: 16 }}>
                  <ChevronDown size={16} color="#000" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Dropdown Kategori Menu */}
            {isDropdownOpen && (
              <View style={styles.dropdownMenu}>
                {kategoriList.map((kat) => (
                  <TouchableOpacity
                    key={kat.id}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setIdKategori(String(kat.id));
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{kat.nama}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Tanggal */}
<Text style={styles.label}>Tanggal</Text>
<View style={styles.inputRow}>
  <View style={styles.iconBox}>
    <Calendar size={16} color="#000000" />
  </View>

  <TouchableOpacity
    style={[styles.inputBox, { justifyContent: 'center' }]}
    onPress={() => setShowDatePicker(true)}
    activeOpacity={0.8}
  >
    <Text
      style={{
        color: tanggal ? '#000000' : '#A9A9A9',
        fontSize: 14,
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: '700',
      }}
    >
      {tanggal || 'Pilih tanggal...'}
    </Text>
  </TouchableOpacity>
</View>

{showDatePicker && (
  <DateTimePicker
    value={tanggal ? new Date(tanggal) : new Date()}
    mode="date"
    display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
    onChange={(event, selectedDate) => {
      setShowDatePicker(false);

      if (selectedDate) {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');

        setTanggal(`${year}-${month}-${day}`);
      }
    }}
  />
)}

            {/* Deskripsi */}
            <Text style={styles.label}>Deskripsi</Text>
            <TextInput
              style={styles.textareaBox}
              placeholder="Tulis deskripsi catatan..."
              placeholderTextColor="#A9A9A9"
              multiline
              maxLength={500}
              value={catatan}
              onChangeText={setCatatan}
              textAlignVertical="top"
            />
            <Text style={styles.charCounter}>
              {catatan.length}/500
            </Text>

            {/* Bottom Actions */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.btnCancel} onPress={onClose} activeOpacity={0.8}>
                <Text style={styles.btnCancelText}>Batalkan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSubmit} onPress={handleSave} activeOpacity={0.8}>
                <Text style={styles.btnSubmitText}>{editingItem ? 'Simpan Perubahan' : 'Buat Catatan'}</Text>
              </TouchableOpacity>
            </View>
              
            {/* Berikan jarak kosong ke bawah HANYA jika bukan mode edit (agar area form tidak ketutupan navbar saat discroll mentok bawah) */}
            {!editingItem && (
              <View style={{ height: 100 }} />
            )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Render Navbar HANYA jika bukan mode edit (!editingItem) */}
        {!editingItem && onChangeTab && (
          <BottomNavSection 
            activeTab={activeTab}
            onChangeTab={onChangeTab}
            onOpenCreate={() => {}}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBF5FC',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? 45 : 29, // Mempertahankan fix poni Realme 5i
    paddingBottom: 40,
  },
  formWrapper: {
    width: '100%',
    maxWidth: 450,
    alignSelf: 'center',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 63,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backBtn: {
    padding: 10,
    marginRight: 10,
  },
  headerTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '800',
    fontSize: 16,
    color: '#000000',
    marginLeft: 10,
  },
  label: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '800',
    fontSize: 14,
    color: '#000000',
    marginBottom: 8,
    marginLeft: 6,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 6,
  },
  iconBox: {
    width: 49,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    flex: 1,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '700',
    fontSize: 14,
    color: '#000000',
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    elevation: 5,
    zIndex: 10,
    paddingVertical: 5,
    marginLeft: 55,
    marginBottom: 16,
    marginTop: -10,
  },
  dropdownItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '700',
    fontSize: 14,
    color: '#000000',
  },
  textareaBox: {
    width: '100%',
    height: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '700',
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
  },
  charCounter: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '700',
    fontSize: 12,
    color: '#A9A9A9',
    textAlign: 'right',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  btnCancel: {
    flex: 1,
    height: 44,
    backgroundColor: '#FF7174',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.85,
  },
  btnCancelText: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '800',
    fontSize: 14,
    color: '#000000',
  },
  btnSubmit: {
    flex: 1,
    height: 44,
    backgroundColor: '#34C759',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.79,
  },
  btnSubmitText: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '800',
    fontSize: 14,
    color: '#000000',
  },
});