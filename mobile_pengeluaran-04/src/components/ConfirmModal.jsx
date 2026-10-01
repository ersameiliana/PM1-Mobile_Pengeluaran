import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Modal, StyleSheet, Animated, Text } from 'react-native';
import { Image } from 'expo-image';

const confirmAssets = {
  add: require('../assets/images/confirm-add.svg'),
  delete: require('../assets/images/confirm-delete.svg'),
  edit: require('../assets/images/confirm-update.svg'),
};

export function ConfirmModal({
  visible,
  type = 'delete', // 'add' | 'delete' | 'edit'
  onConfirm,
  onCancel
}) {
  const source = confirmAssets[type] || confirmAssets.delete;

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Image 
            source={source} 
            style={styles.modalImage} 
            contentFit="contain" 
          />
          
          {/* Ya Button */}
          <TouchableOpacity 
            style={[styles.absoluteBtn, { left: 7, top: 142, width: 109, height: 44 }]} 
            onPress={onConfirm} 
            activeOpacity={0.5}
          />

          {/* Tidak Button */}
          <TouchableOpacity 
            style={[styles.absoluteBtn, { left: 134, top: 142, width: 109, height: 44 }]} 
            onPress={onCancel} 
            activeOpacity={0.5}
          />
        </View>
      </View>
    </Modal>
  );
}

// SVG-based toasts (success notifications)
const toastSvgAssets = {
  'create-success': require('../assets/images/create-success.svg'),
  'delete-success': require('../assets/images/delete-success.svg'),
  'update-success': require('../assets/images/update-success.svg'),
  'refresh-success': require('../assets/images/refresh-success.svg'),
  'not-found': require('../assets/images/not-found.svg'),
};

// Cat image-based toasts
const catImageAssets = {
  'error-alerts': require('../assets/images/cat-error.png'),
  'lack-info': require('../assets/images/cat-lack-info.png'),
};

const catToastConfig = {
  'error-alerts': {
    title: 'Terjadi Kesalahan!',
    message: 'Mohon coba lagi nanti.',
    bgColor: '#FFF0F0',
    borderColor: '#FFB3B3',
  },
  'lack-info': {
    title: 'Data Belum Lengkap!',
    message: 'Mohon isi semua kolom wajib.',
    bgColor: '#FFF8E1',
    borderColor: '#FFD54F',
  },
};

export function CustomToast({ alertState, onClose }) {
  const slideAnim = useRef(new Animated.Value(-200)).current;
  const [currentAlert, setCurrentAlert] = useState({ type: 'create-success' });

  useEffect(() => {
    if (alertState) {
      setCurrentAlert(alertState);
      // Slide in
      Animated.spring(slideAnim, {
        toValue: 60,
        speed: 20,
        bounciness: 8,
        useNativeDriver: true,
      }).start();

      // Auto close
      const timer = setTimeout(() => {
        closeToast();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [alertState]);

  const closeToast = () => {
    Animated.timing(slideAnim, {
      toValue: -200,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      if (onClose) onClose();
    });
  };

  let assetType = currentAlert?.type || 'create-success';
  if (assetType === 'success') assetType = 'create-success';
  if (assetType === 'error') assetType = 'error-alerts';

  // Check if this is a cat-image toast or SVG toast
  const isCatToast = !!catImageAssets[assetType];

  if (isCatToast) {
    const catImage = catImageAssets[assetType];
    const config = catToastConfig[assetType];

    return (
      <Modal visible={!!alertState} transparent={true} animationType="none" onRequestClose={closeToast}>
        <Animated.View style={[styles.toastContainer, { transform: [{ translateY: slideAnim }] }]} pointerEvents="box-none">
          <TouchableOpacity 
            style={[styles.catToastCard, { backgroundColor: config.bgColor, borderColor: config.borderColor }]}
            onPress={closeToast}
            activeOpacity={0.9}
          >
            <Image 
              source={catImage} 
              style={styles.catToastImage} 
              contentFit="contain" 
            />
            <View style={styles.catToastTextContainer}>
              <Text style={styles.catToastTitle}>{config.title}</Text>
              <Text style={styles.catToastMessage}>{config.message}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    );
  }

  const source = toastSvgAssets[assetType] || toastSvgAssets['create-success'];

  return (
    <Modal visible={!!alertState} transparent={true} animationType="none" onRequestClose={closeToast}>
      <Animated.View style={[styles.toastContainer, { transform: [{ translateY: slideAnim }] }]} pointerEvents="none">
        <Image 
          source={source} 
          style={styles.toastImage} 
          contentFit="contain" 
          priority="high"
        />
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: 254,
    height: 188,
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  absoluteBtn: {
    position: 'absolute',
  },
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
    elevation: 10,
  },
  toastImage: {
    width: 349,
    height: 122,
  },
  // Cat-based toast card styles
  catToastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 349,
    minHeight: 90,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  catToastImage: {
    width: 64,
    height: 64,
    marginRight: 12,
  },
  catToastTextContainer: {
    flex: 1,
  },
  catToastTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '800',
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 2,
  },
  catToastMessage: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '500',
    fontSize: 12,
    color: '#555555',
  },
});
