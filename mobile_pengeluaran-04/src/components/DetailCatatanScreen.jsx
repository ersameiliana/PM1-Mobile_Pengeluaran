import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { ArrowLeft, MoreHorizontal, Calendar, Edit2, Trash2 } from 'lucide-react-native';
import { getCategoryIconComponent } from './CategoryIcon';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function DetailCatatanScreen({ item, onBack, onDelete, onEdit }) {
  const dateStr = item?.tanggal 
    ? new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) 
    : '2 Mar 2026';
    
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#DBF5FC" barStyle="dark-content" />
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.headerBtn} onPress={onBack} activeOpacity={0.7}>
            <ArrowLeft size={20} color="black" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Detail Catatan</Text>

          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
            <MoreHorizontal size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Main Info Card */}
        <View style={styles.infoCard}>
          {/* Top: Icon + Title + Category */}
          <View style={styles.topSection}>
            <View style={styles.categoryIcon}>
              {getCategoryIconComponent(item?.nama_kategori, 32, 'black')}
            </View>
            <View style={styles.titleSection}>
              <Text style={styles.itemTitle}>{item?.judul}</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{item?.nama_kategori}</Text>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Total Nominal */}
          <View style={styles.nominalRow}>
            <Text style={styles.nominalLabel}>Total Nominal</Text>
            <Text style={styles.nominalValue}>
              Rp {item?.nominal ? item.nominal.toLocaleString('id-ID') : '0'}
            </Text>
          </View>

          {/* Date Pill */}
          <View style={styles.datePill}>
            <View style={styles.dateIconBox}>
              <Calendar size={16} color="#4A90C4" />
            </View>
            <Text style={styles.dateText}>{dateStr}</Text>
          </View>

          {/* Edit Button */}
          <TouchableOpacity 
            style={styles.editPill} 
            onPress={() => item && onEdit && onEdit(item)}
            activeOpacity={0.7}
          >
            <Edit2 size={16} color="black" />
            <Text style={styles.editPillText}>Edit Catatan</Text>
          </TouchableOpacity>
        </View>

        {/* Description Card */}
        <View style={styles.descCard}>
          <Text style={styles.descLabel}>Deskripsi</Text>
          <View style={styles.descContent}>
            <Text style={styles.descText}>
              {item?.catatan || 'Belum ada deskripsi...'}
            </Text>
          </View>
          <Text style={styles.descCounter}>
            {item?.catatan ? item.catatan.length : 0}/500
          </Text>
        </View>
      </ScrollView>

      {/* Delete Button - Fixed at bottom */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.deleteBtn}
          onPress={() => item && onDelete && onDelete(item)}
          activeOpacity={0.7}
        >
          <Trash2 size={16} color="black" />
          <Text style={styles.deleteBtnText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBF5FC',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 20,
  },

  // Header
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 64,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCEFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Plus Jakarta Sans',
  },

  // Info Card
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#26597F',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#98CCFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  titleSection: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Plus Jakarta Sans',
    marginBottom: 6,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAF6FF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  categoryBadgeText: {
    color: '#4A90C4',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Plus Jakarta Sans',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAF6FF',
    marginBottom: 16,
  },
  nominalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  nominalLabel: {
    fontSize: 14,
    color: '#6B7A9A',
    fontFamily: 'Plus Jakarta Sans',
  },
  nominalValue: {
    fontSize: 18,
    color: '#4A90C4',
    fontWeight: 'bold',
    fontFamily: 'Plus Jakarta Sans',
  },
  datePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#98CCFF',
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  dateIconBox: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dateText: {
    fontSize: 14,
    color: '#1A1A2E',
    fontWeight: 'bold',
    fontFamily: 'Plus Jakarta Sans',
  },
  editPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#98CCFF',
    borderRadius: 16,
    height: 40,
    gap: 8,
  },
  editPillText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Plus Jakarta Sans',
  },

  // Description Card
  descCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    elevation: 3,
    shadowColor: '#26597F',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
  },
  descLabel: {
    fontSize: 14,
    color: '#1A1A2E',
    fontWeight: 'bold',
    fontFamily: 'Plus Jakarta Sans',
    marginBottom: 12,
  },
  descContent: {
    backgroundColor: '#98CCFF',
    borderRadius: 16,
    padding: 16,
    minHeight: 80,
    marginBottom: 8,
  },
  descText: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Plus Jakarta Sans',
  },
  descCounter: {
    fontSize: 10,
    color: '#9BA4B4',
    textAlign: 'right',
  },

  // Bottom Actions
  bottomActions: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FA8589',
    borderRadius: 26,
    height: 52,
    gap: 8,
  },
  deleteBtnText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Plus Jakarta Sans',
  },
});
