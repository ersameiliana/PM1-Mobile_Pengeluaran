// SECTION: Transaction List Section (Figma Group 60)
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Clock, ClipboardList, Edit2, Trash2 } from 'lucide-react-native';
import { getCategoryIconComponent } from './CategoryIcon';
import { Image } from 'expo-image';

export function TransactionListSection({ items = [], title = 'Catatan Terbaru', onDetail, onEdit, onDelete, onAddNew }) {
  const formatRupiah = (val) => {
    return 'Rp ' + Number(val || 0).toLocaleString('id-ID');
  };

  const formatTanggal = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const bulan = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  };

  const getRelativeUploadDate = (dibuatPadaStr) => {
    if (!dibuatPadaStr) return 'Baru saja ditambahkan';
    const uploadDate = new Date(dibuatPadaStr);
    const now = new Date();
    
    // Set to start of day for accurate day difference
    const startOfUpload = new Date(uploadDate.getFullYear(), uploadDate.getMonth(), uploadDate.getDate());
    const startOfNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const diffTime = Math.abs(startOfNow - startOfUpload);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Diupload hari ini';
    if (diffDays === 1) return 'Diupload kemarin';
    if (diffDays <= 7) return `Diupload ${diffDays} hari yang lalu`;
    return `Diupload ${formatTanggal(dibuatPadaStr)}`;
  };

  return (
    <View style={styles.container}>
      {/* Section Header: Clock icon + "Catatan Terbaru" + "Lihat semua >" */}
      <View style={styles.sectionHeader}>
        <View style={styles.headerLeft}>
          {/* Clock icon (Vector_15 in SVG) */}
          <Clock size={18} color="#000000" />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.seeAllBtn} activeOpacity={0.7}>
          <Text style={styles.seeAllText}>Lihat semua</Text>
          <Text style={styles.seeAllArrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction Cards or Empty State */}
      {items.length === 0 ? (
        /* Empty state (Figma Group 112) */
        <View style={styles.emptyCard}>
          <Image
            source={require('../assets/images/cat-sleeping.png')}
            style={{ width: 140, height: 140, marginBottom: 12 }}
            contentFit="contain"
          />
          <Text style={styles.emptyText}>Belum ada riwayat nih~</Text>
        </View>
      ) : (
        items.map((item) => (
          <View key={item.id} style={styles.card}>
            <TouchableOpacity style={styles.cardContent} onPress={() => onDetail && onDetail(item)} activeOpacity={0.7}>
              {/* Left side (Icon) */}
              <View style={styles.cardLeft}>
                {/* ICON DIBIKIN SERAGAM DENGAN CATEGORY SECTION */}
                <View style={styles.iconCircle}>
                  {getCategoryIconComponent(item.nama_kategori, 24, '#000000')}
                </View>
              </View>

              {/* Middle (Title, Price, Tag) */}
              <View style={styles.cardMiddle}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.judul}</Text>
                <Text style={styles.itemPrice}>{formatRupiah(item.nominal)}</Text>
                <View style={styles.tagPill}>
                  <Text style={styles.tagText}>{item.nama_kategori || 'Lainnya'}</Text>
                </View>
              </View>

              {/* Right side (Subtitle, Date) */}
              <View style={styles.cardRight}>
                <Text style={styles.itemSubtitle}>{getRelativeUploadDate(item.dibuat_pada)}</Text>
                <Text style={styles.itemDate}>{formatTanggal(item.tanggal)}</Text>
              </View>
            </TouchableOpacity>

            {/* Action buttons (Edit / Hapus) */}
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.editBtn} onPress={() => onEdit(item)} activeOpacity={0.7}>
                <Edit2 size={16} color="#000000" />
                <Text style={styles.editBtnText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(item)} activeOpacity={0.7}>
                <Trash2 size={16} color="#FF0000" />
                <Text style={styles.deleteBtnText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 11,
    marginBottom: 100, // space for bottom nav
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clockIcon: {
    fontSize: 18,
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
  // Empty state (Group 112)
  emptyCard: {
    width: '100%',
    height: 189,
    backgroundColor: 'rgba(173, 217, 254, 0.43)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIllustration: {
    fontSize: 60,
    marginBottom: 12,
  },
  emptyText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  // Card styles for populated list
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
  },
  cardLeft: {
    marginRight: 12,
    justifyContent: 'center',
  },
  cardMiddle: {
    flex: 1,
    justifyContent: 'center',
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  tagPill: {
    alignSelf: 'flex-start',
    height: 20,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#98CCFF',
    justifyContent: 'center',
    marginTop: 8,
  },
  tagText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
  },
  itemTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  itemPrice: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
  itemSubtitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 10,
    fontWeight: '200',
    color: '#000000',
  },
  itemDate: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 13,
    fontWeight: '500',
    color: '#000000',
  },
  // DIUPDATE: Seragam dengan Category Section
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29, // Bulat sempurna
    backgroundColor: '#E6F4FF', // Warna latar biru muda
    borderWidth: 4, // Ring ketebalan 4px
    borderColor: '#DCEFFF', // Warna ring luar
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 24,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
  },
  editBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#DCEFFF',
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  editBtnText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
  },
  deleteBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#FFE5E5',
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteBtnText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 12,
    fontWeight: '700',
    color: '#FF0000',
  },
});