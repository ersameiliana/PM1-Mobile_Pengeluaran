// SECTION: Category Section (Figma Group 59)
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { getCategoryIconComponent } from './CategoryIcon';

export function CategorySection({ kategoriList, selectedKategoriId, onSelectKategori }) {
  // 1. Pastikan data selalu berupa array (mencegah crash jika parent mengirim nilai null)
  const safeList = Array.isArray(kategoriList) ? kategoriList : [];
  
  // 2. Gunakan optional chaining (?.) agar aman jika atribut 'nama' bernilai undefined/null
  const isLainnyaExist = safeList.some(kat => kat?.nama?.toLowerCase() === 'lainnya');
  
  // 3. Buat list kategori final dengan opsi "Lainnya"
  const finalKategoriList = isLainnyaExist 
    ? safeList 
    : [...safeList, { id: 'kategori_lainnya', nama: 'Lainnya' }];

  return (
    <View style={styles.container}>
      {/* Section Header: "Kategori" + "Lihat semua >" */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Kategori</Text>
        <TouchableOpacity style={styles.seeAllBtn} activeOpacity={0.7}>
          <Text style={styles.seeAllText}>Lihat semua</Text>
          <Text style={styles.seeAllArrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal scroll of category items */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollRow}>
        {/* GUNAKAN finalKategoriList DI SINI */}
        {finalKategoriList.map((kat) => {
          const isSelected = selectedKategoriId === kat.id;

          return (
            <TouchableOpacity
              key={kat.id}
              style={styles.categoryItem}
              onPress={() => onSelectKategori(isSelected ? null : kat.id)}
              activeOpacity={0.7}
            >
              {/* Lingkaran Icon yang sudah disesuaikan agar bulat sempurna dengan ring luar */}
              <View style={[styles.iconCircle, isSelected && styles.iconCircleSelected]}>
                {getCategoryIconComponent(kat?.nama, 24, '#000000')}
              </View>

              {/* Category name chip dibikin naik menabrak lingkaran (Overlap) */}
              <View style={styles.nameChip}>
                <Text style={styles.categoryName} numberOfLines={1}>{kat?.nama || 'Tanpa Nama'}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 16,
    paddingLeft: 11,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingRight: 11,
  },
  sectionTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 10,
    fontWeight: '400',
    color: '#000000',
  },
  seeAllArrow: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000000',
  },
  scrollRow: {
    flexDirection: 'row',
    gap: 16, // gap sedikit dirapatkan agar pas
  },
  categoryItem: {
    alignItems: 'center',
    width: 79,
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29, // Membuatnya bulat sempurna
    backgroundColor: '#E6F4FF', // Warna isi lingkaran
    borderWidth: 4, // Ketebalan ring luar seperti di gambar
    borderColor: '#DCEFFF', // Warna ring luar
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  iconCircleSelected: {
    backgroundColor: '#DCEFFF',
    borderColor: '#98CCFF',
  },
  nameChip: {
    width: 79,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF6F6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    marginTop: -10, // KUNCI OVERLAP: Menarik kotak teks ke atas menabrak lingkaran
    zIndex: 2, // Memastikan teks berada di atas lingkaran
  },
  categoryName: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
});