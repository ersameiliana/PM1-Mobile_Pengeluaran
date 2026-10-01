// Root App Entry Point - Render Prototipe Pengeluaran Figma (MVC)
import React from 'react';
import HomeScreen from './src/app/index.jsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}