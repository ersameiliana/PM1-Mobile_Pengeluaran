import React from 'react';
// 1. Import icon yang ada dari lucide-react-native
import { Utensils, GraduationCap, ShoppingBag, HeartPulse, Wallet, LayoutGrid } from 'lucide-react-native';

// 2. Import Motorcycle dari iconoir-react-native
import { Motorcycle } from 'iconoir-react-native';

export function getCategoryIconComponent(kategoriName, size = 24, color = 'black') {
  const name = (kategoriName || '').toLowerCase();
  
  if (name.includes('makan')) return <Utensils size={size} color={color} />;
  
  // 3. Pakai Motorcycle dari Iconoir di sini
  if (name.includes('transport') || name.includes('bensin')) {
    return <Motorcycle width={size} height={size} color={color} />;
  }
  
  if (name.includes('didik')) return <GraduationCap size={size} color={color} />;
  if (name.includes('belanja')) return <ShoppingBag size={size} color={color} />;
  if (name.includes('sehat')) return <HeartPulse size={size} color={color} />;
  if (name.includes('lainnya')) return <LayoutGrid size={size} color={color} />;
  
  return <Wallet size={size} color={color} />;
}