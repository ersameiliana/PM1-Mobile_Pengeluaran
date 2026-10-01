// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('mjs');

// Allow SVG files to be loaded as assets (for expo-image)
config.resolver.assetExts.push('svg');
config.resolver.sourceExts = config.resolver.sourceExts.filter(ext => ext !== 'svg');

module.exports = config;
