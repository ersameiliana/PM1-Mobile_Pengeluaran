// SECTION: Search Bar Section (Figma: Group 56)
import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Search } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function SearchBarSection({ searchQuery, setSearchQuery }) {
  return (
    <View style={styles.container}>
      {/* Search input bar (Figma: 390x37, borderRadius 18.5, bg white) */}
      <View style={styles.searchBox}>
        {/* Search Icon (Vector_6) */}
        <Search size={16} color="#000000" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.input}
          placeholder="Cari catatan..."
          placeholderTextColor="#000000"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 11,
    marginTop: 24,
    marginBottom: 0,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 37,
    borderRadius: 18.5,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    padding: 0,
  },
});

