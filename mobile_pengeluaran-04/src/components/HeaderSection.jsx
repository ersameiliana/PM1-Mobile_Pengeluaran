// SECTION: Header Section (Figma Group 55 - Rectangle 28_2 white rounded bar)
// Layout: Avatar (Ellipse 6) | Greeting text | Bell icon (Vector_16)
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Bell } from 'lucide-react-native';
import ProfileM from '../assets/images/ProfileM.png';

export function HeaderSection({ username = 'User', onRefresh, loading }) {
  return (
    <View style={styles.wrapper}>
      {/* White rounded card (Rectangle 28_2: x=7, y=24, w=396, h=63.5, rx=25) */}
      <View style={styles.headerBar}>
        {/* Avatar circle */}
        <Image source={ProfileM} style={styles.avatarImage} />

        {/* Greeting text */}
        <View style={styles.textBox}>
          <Text style={styles.greetingTitle}>Hai, {username}!</Text>
          <Text style={styles.greetingSub}>Ini adalah dashboard utamamu</Text>
        </View>

        {/* Bell / notification icon (Vector_16) */}
        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
          <Bell size={24} color="#000000" />
          <View style={styles.bellDot} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 7,
    paddingTop: 24,
    paddingBottom: 0,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 63,
    paddingHorizontal: 16,
  },
  avatarImage: {
  width: 37,
  height: 37,
  borderRadius: 18.5,
  marginRight: 10,
},
  avatarCircle: {
    width: 37,
    height: 37,
    borderRadius: 18.5,
    backgroundColor: '#D9D9D9',
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  textBox: {
    flex: 1,
  },
  greetingTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  greetingSub: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 11,
    fontWeight: '400',
    color: '#000000',
    marginTop: 1,
  },
  bellBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    fontSize: 20,
  },
  bellDot: {
    position: 'absolute',
    top: 4,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF0000',
  },
});

