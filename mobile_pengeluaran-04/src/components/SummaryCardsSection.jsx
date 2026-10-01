// SECTION: Summary Cards Section (Figma Group 58)
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function SummaryCardsSection({ totalTransaksi = 0, totalNominal = 0 }) {
  const formatRupiah = (val) => {
    return 'Rp ' + Number(val || 0).toLocaleString('id-ID');
  };

  return (
    <View style={styles.container}>
      {/* Outer white card (Rectangle 6) */}
      <View style={styles.outerCard}>
        {/* Inner blue area (Rectangle 29) */}
        <View style={styles.innerBlueArea}>
          {/* Top row */}
          <View style={styles.topRow}>
            {/* Calendar Icon (Rectangle 28) */}
            <View style={styles.calendarIcon}>
              <Calendar size={20} color="#000000" />
            </View>
            
            {/* Catatan Hari Ini (Rectangle 30) */}
            <View style={styles.headerPill}>
              <Text style={styles.headerText}>Total Catatan Kamu</Text>
            </View>
          </View>

          {/* Bottom row (aligned with Catatan Hari Ini) */}
          <View style={styles.statsRow}>
            {/* Stat 1: Catatan (Rectangle 31) */}
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Catatan</Text>
              <Text style={styles.statValue}>{totalTransaksi}</Text>
            </View>

            {/* Stat 2: Total Nominal (Rectangle 32) */}
            <View style={styles.statBoxRight}>
              <Text style={styles.statLabel}>Total Nominal</Text>
              <Text style={styles.statValue}>{formatRupiah(totalNominal)}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 36, // approx gap from search bar (y=185 - (112+37) = 36)
  },
  outerCard: {
    backgroundColor: '#FFFFFF',
    width: SCREEN_WIDTH - 23,
    height: 133,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBlueArea: {
    backgroundColor: 'rgba(173, 217, 254, 0.43)',
    width: SCREEN_WIDTH - 37,
    height: 112,
    borderRadius: 20,
    paddingTop: 9,
    paddingLeft: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    width: 49,
    height: 42,
    borderRadius: 20,
    backgroundColor: '#C8E6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7, // 82 - (26 + 49) = 7
  },
  headerPill: {
    flex: 1,
    height: 37,
    backgroundColor: 'rgba(173, 217, 254, 0.43)',
    borderRadius: 18.5,
    justifyContent: 'center',
    paddingLeft: 16,
    marginRight: 8,
  },
  headerText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14, // Assuming from previous
    fontWeight: '700',
    color: '#000000',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 56,
    marginRight: 8,
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 0.45,
    height: 38,
    backgroundColor: 'rgba(173, 217, 254, 0.43)',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statBoxRight: {
    flex: 0.45,
    height: 38,
    backgroundColor: 'rgba(173, 217, 254, 0.43)',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 10,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 0,
  },
  statValue: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 13,
    fontWeight: '700',
    color: '#000000',
  },
});
