// SECTION: Bottom Navigation Bar (Figma Group 76 - "Beranda", "Buat Catatan", "Riwayat Catatan")
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { Home, PlusCircle, Clock } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function BottomNavSection({ activeTab = 'Beranda', onChangeTab, onOpenCreate }) {
  const insets = useSafeAreaInsets();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (isKeyboardVisible) {
    return null;
  }

  const tabs = [
    { key: 'Beranda', label: 'Beranda', IconComponent: Home },
    { key: 'Buat Catatan', label: 'Buat', IconComponent: PlusCircle },
    { key: 'Riwayat Catatan', label: 'Riwayat', IconComponent: Clock },
  ];

  const handlePress = (key) => {
    if (key === 'Buat Catatan') {
      onOpenCreate();
    } else {
      onChangeTab(key);
    }
  };

  // Menggunakan Math.max untuk berjaga-jaga jika insets.bottom bernilai 0 di HP tertentu
  const bottomPosition = 9 + Math.max(insets.bottom, 8);

  return (
    <View style={[styles.navContainer, { bottom: bottomPosition }]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const Icon = tab.IconComponent;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.navItem,
              isActive && styles.activeNavItem
            ]}
            onPress={() => handlePress(tab.key)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconCircle, isActive && styles.iconCircleActive]}>
              <Icon size={20} color={isActive ? "#000000" : "#666666"} />
            </View>
            {isActive && (
              <Text style={styles.navLabelActive} numberOfLines={1}>
                {tab.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    left: 8,
    right: 8, // Menggantikan manual kalkulasi width: width - 16
    height: 72,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between', // Diubah agar menyebar rata ke ujung
    paddingHorizontal: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    flex: 1, // PENTING: Memaksa setiap tab punya porsi lebar yang sama rata (33%)
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 57,
    borderRadius: 20,
    gap: 2,
    marginHorizontal: 4, // Memberi jarak antar tab agar tidak berdempetan
  },
  activeNavItem: {
    backgroundColor: '#DBF5FC',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleActive: {
    backgroundColor: '#98CCFF',
  },
  navLabelActive: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '700',
    fontSize: 11,
    color: '#000000',
    textAlign: 'center',
  },
});