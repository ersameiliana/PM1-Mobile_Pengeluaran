// SECTION: Riwayat Pengeluaran Screen (Figma: clip0_2071_2336)
// Full screen component with header, search, date filters, transaction cards, and bottom nav
import React, { useState, useMemo } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  TextInput, Dimensions, StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, FileText, Search, ClipboardList, ChevronRight, Home, Plus, Clock } from 'lucide-react-native';
import { getCategoryIconComponent } from './CategoryIcon';
import { BottomNavSection } from './BottomNavSection';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

// Date formatter: "2 Mar 2026"
const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

// Currency formatter
const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return 'Rp 0';
  return `Rp ${Number(amount).toLocaleString('id-ID')}`;
};

// Date filter logic
const isToday = (dateStr) => {
  const d = new Date(dateStr);
  const now = new Date();
  return d.toDateString() === now.toDateString();
};
const isThisWeek = (dateStr) => {
  const d = new Date(dateStr);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0,0,0,0);
  return d >= startOfWeek;
};
const isThisMonth = (dateStr) => {
  const d = new Date(dateStr);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
};

// ─── HEADER ────────────────────────────────────────────
function RiwayatHeader({ onBack }) {
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.headerBar}>
        {/* Back arrow */}
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <ArrowLeft size={22} color="#000000" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.headerTitle}>Riwayat Pengeluaran</Text>

        {/* Search/Document icon */}
        <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
          <FileText size={20} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── SEARCH BAR ────────────────────────────────────────
function RiwayatSearchBar({ searchQuery, setSearchQuery, isFilterActive, onToggleFilter }) {
  return (
    <View style={styles.searchRow}>
      <View style={styles.searchInputContainer}>
        <Search size={16} color="#000000" style={{ marginRight: 10 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari catatan..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <TouchableOpacity 
        style={[styles.filterBtn, isFilterActive && { backgroundColor: '#98CCFF' }]} 
        activeOpacity={0.7}
        onPress={onToggleFilter}
      >
        <View style={styles.filterLines}>
          <View style={[styles.filterLine, { width: 18 }]} />
          <View style={[styles.filterLine, { width: 14, marginTop: 3 }]} />
          <View style={[styles.filterLine, { width: 10, marginTop: 3 }]} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

// ─── DATE FILTER PILLS ────────────────────────────────
function DateFilterPills({ activeFilter, onChangeFilter }) {
  const filters = ['Hari Ini', 'Minggu Ini', 'Bulan Ini', 'Semua'];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.dateFilterScroll}
      contentContainerStyle={styles.dateFilterContent}
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <TouchableOpacity
            key={filter}
            style={[styles.datePill, isActive && styles.datePillActive]}
            onPress={() => onChangeFilter(filter)}
            activeOpacity={0.7}
          >
            <Text style={[styles.datePillText, isActive && styles.datePillTextActive]}>
              {filter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

// ─── TRANSACTION CARD ─────────────────────────────────
function TransactionCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={() => onPress && onPress(item)}>
      {/* Left: Icon circle */}
      <View style={styles.cardIconCircle}>
        {getCategoryIconComponent(item.nama_kategori, 24, '#000000')}
      </View>

      {/* Middle: Content */}
      <View style={styles.cardContent}>
        {/* Title + Amount row */}
        <Text style={styles.cardTitle} numberOfLines={1}>{item.judul || 'Tanpa Judul'}</Text>
        <Text style={styles.cardAmount}>{formatCurrency(item.nominal)}</Text>

        {/* Category tag */}
        <View style={styles.cardTagRow}>
          <View style={styles.cardTag}>
            <Text style={styles.cardTagText}>{item.nama_kategori || 'Lainnya'}</Text>
          </View>
        </View>
      </View>

      {/* Right: Date + Arrow */}
      <View style={styles.cardRight}>
        <Text style={styles.cardDate}>{formatDate(item.tanggal)}</Text>
        {item.deskripsi ? (
          <Text style={styles.cardDesc} numberOfLines={1}>{item.deskripsi}</Text>
        ) : null}
        {/* Arrow */}
        <ChevronRight size={22} color="#000000" />
      </View>
    </TouchableOpacity>
  );
}

// ─── EMPTY STATE ──────────────────────────────────────
function EmptyState() {
  return (
    <View style={styles.emptyContainer}>
      <Image
        source={require('../assets/images/cat-sleeping.png')}
        style={{ width: 160, height: 160, marginBottom: 12 }}
        contentFit="contain"
      />
      <Text style={styles.emptyTitle}>Belum Ada Riwayat</Text>
      <Text style={styles.emptySub}>Catatan pengeluaran akan muncul di sini</Text>
    </View>
  );
}

// ─── BOTTOM NAV (uses shared component) ──────────────
// Replaced with BottomNavSection for consistency
// ═══ MAIN SCREEN ═══════════════════════════════════════
export function RiwayatScreen({
  items = [],
  searchQuery = '',
  setSearchQuery,
  onDetail,
  onEdit,
  onDelete,
  onBack,
  onChangeTab,
  onOpenCreate,
}) {
  const [dateFilter, setDateFilter] = useState('Semua');
  const [isFilterActive, setIsFilterActive] = useState(false);

  // Filter items by date + search
  const filteredItems = useMemo(() => {
    let result = items;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item =>
        (item.judul && item.judul.toLowerCase().includes(q)) ||
        (item.deskripsi && item.deskripsi.toLowerCase().includes(q)) ||
        (item.nama_kategori && item.nama_kategori.toLowerCase().includes(q))
      );
    }

    // Date filter
    if (dateFilter === 'Hari Ini') {
      result = result.filter(item => isToday(item.tanggal));
    } else if (dateFilter === 'Minggu Ini') {
      result = result.filter(item => isThisWeek(item.tanggal));
    } else if (dateFilter === 'Bulan Ini') {
      result = result.filter(item => isThisMonth(item.tanggal));
    }

    return result;
  }, [items, searchQuery, dateFilter]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#DBF5FC" barStyle="dark-content" />

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <RiwayatHeader onBack={onBack} />

        {/* Search Bar + Filter */}
        <RiwayatSearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          isFilterActive={isFilterActive}
          onToggleFilter={() => {
            setIsFilterActive(!isFilterActive);
            if (isFilterActive) setDateFilter('Semua'); // reset filter when closed
          }}
        />

        {/* Date Filter Pills */}
        {isFilterActive && (
          <DateFilterPills activeFilter={dateFilter} onChangeFilter={setDateFilter} />
        )}

        {/* Transaction Cards */}
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <TransactionCard
              key={item.id || index}
              item={item}
              onPress={onDetail}
            />
          ))
        ) : (
          <EmptyState />
        )}

        {/* Bottom spacing for nav */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavSection 
        activeTab="Riwayat Catatan" 
        onChangeTab={onChangeTab} 
        onOpenCreate={onOpenCreate} 
      />
    </SafeAreaView>
  );
}

// ═══ STYLES ════════════════════════════════════════════
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBF5FC',
  },
  scrollContainer: {
    flex: 1,
  },

  // ── Header ──
  headerWrapper: {
    paddingHorizontal: 7,
    paddingTop: 24,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 63,
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  backArrow: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '700',
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 20,
  },

  // ── Search Bar ──
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 19,
    marginTop: 16,
    gap: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18.5,
    height: 37,
    paddingHorizontal: 16,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,
    color: '#000000',
    padding: 0,
  },
  filterBtn: {
    width: 52,
    height: 37,
    backgroundColor: '#FFFFFF',
    borderRadius: 18.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterLines: {
    alignItems: 'flex-start',
  },
  filterLine: {
    height: 2,
    backgroundColor: '#000000',
    borderRadius: 1,
  },

  // ── Date Filter Pills ──
  dateFilterScroll: {
    marginTop: 16,
    paddingLeft: 19,
  },
  dateFilterContent: {
    paddingRight: 19,
    gap: 8,
  },
  datePill: {
    height: 39,
    paddingHorizontal: 20,
    borderRadius: 19.5,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePillActive: {
    backgroundColor: '#98CCFF',
  },
  datePillText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  datePillTextActive: {
    color: '#000000',
    fontWeight: '700',
  },

  // ── Transaction Card ──
  card: {
    marginHorizontal: 19,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 120,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardIconCircle: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#DBF5FC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardIconEmoji: {
    fontSize: 24,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  cardAmount: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  cardTagRow: {
    flexDirection: 'row',
  },
  cardTag: {
    backgroundColor: '#98CCFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  cardTagText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 11,
    fontWeight: '600',
    color: '#000000',
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 8,
  },
  cardDate: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 11,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 4,
  },
  cardDesc: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 10,
    color: '#999999',
    maxWidth: 80,
    textAlign: 'right',
    marginBottom: 8,
  },
  cardArrow: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '700',
  },

  // ── Empty State ──
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    marginHorizontal: 19,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 6,
  },
  emptySub: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 13,
    color: '#666666',
  },

});

