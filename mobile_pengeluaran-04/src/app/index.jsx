// SECTION: Main View Screen - Home / Dashboard (Figma: Home-default)
import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePengeluaranController } from '../controllers/usePengeluaranController';

// SECTION Imports: Traceable UI Components per Section Figma
import { HeaderSection } from '../components/HeaderSection';
import { SummaryCardsSection } from '../components/SummaryCardsSection';
import { SearchBarSection } from '../components/SearchBarSection';
import { CategorySection } from '../components/CategorySection';
import { TransactionListSection } from '../components/TransactionListSection';
import { CatatanFormModal } from '../components/CatatanFormModal';
import { ConfirmModal, CustomToast } from '../components/ConfirmModal';
import { BottomNavSection } from '../components/BottomNavSection';
import { RiwayatScreen } from '../components/RiwayatScreen';
import { DetailCatatanScreen } from '../components/DetailCatatanScreen';
import { RefreshCw } from 'lucide-react-native';

export default function HomeScreen() {
  // SECTION: Controller Hook (MVC Pattern)
  const {
    pengeluaranList,
    kategoriList,
    summary,
    loading,
    searchQuery,
    setSearchQuery,
    selectedKategoriId,
    setSelectedKategoriId,
    activeTab,
    setActiveTab,
    isFormModalOpen,
    setIsFormModalOpen,
    editingItem,
    confirmState,
    setConfirmState,
    alertState,
    setAlertState,
    detailItem,
    setDetailItem,
    handleRefresh,
    handleOpenCreateModal,
    handleOpenEditModal,
    handlePromptSave,
    handlePromptDelete,
    handleConfirmAction
  } = usePengeluaranController();

  // SECTION: Detail Screen Rendering
  if (detailItem) {
    return (
      <>
        <DetailCatatanScreen
          item={detailItem}
          onBack={() => setDetailItem(null)}
          onEdit={(item) => {
            handleOpenEditModal(item);
          }}
          onDelete={(item) => {
            handlePromptDelete(item);
          }}
        />

        {/* Modals remain available */}
        <CatatanFormModal
          visible={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSubmit={handlePromptSave}
          onValidationFailed={() => setAlertState({ type: 'lack-info' })}
          editingItem={editingItem}
          kategoriList={kategoriList}
          onChangeTab={(tab) => {
            setIsFormModalOpen(false);
            setActiveTab(tab);
          }}
          activeTab={editingItem ? activeTab : 'Buat Catatan'}
        />
        <ConfirmModal
          visible={!!confirmState}
          type={confirmState?.type || 'delete'}
          onConfirm={handleConfirmAction}
          onCancel={() => setConfirmState(null)}
        />
        <CustomToast
          alertState={alertState}
          onClose={() => setAlertState(null)}
        />
      </>
    );
  }

  // SECTION: Conditional Screen Rendering based on activeTab
  // When "Riwayat Catatan" is active, render the full Riwayat screen
  if (activeTab === 'Riwayat Catatan') {
    return (
      <>
        <RiwayatScreen
          items={pengeluaranList}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onDetail={setDetailItem}
          onEdit={handleOpenEditModal}
          onDelete={handlePromptDelete}
          onBack={() => setActiveTab('Beranda')}
          onChangeTab={setActiveTab}
          onOpenCreate={handleOpenCreateModal}
        />

        {/* Modals remain available on Riwayat screen */}
        <CatatanFormModal
          visible={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSubmit={handlePromptSave}
          onValidationFailed={() => setAlertState({ type: 'lack-info' })}
          editingItem={editingItem}
          kategoriList={kategoriList}
          onChangeTab={(tab) => {
            setIsFormModalOpen(false);
            setActiveTab(tab);
          }}
          activeTab={editingItem ? activeTab : 'Buat Catatan'}
        />
        <ConfirmModal
          visible={!!confirmState}
          type={confirmState?.type || 'delete'}
          onConfirm={handleConfirmAction}
          onCancel={() => setConfirmState(null)}
        />
        <CustomToast
          alertState={alertState}
          onClose={() => setAlertState(null)}
        />
      </>
    );
  }

  // SECTION: Default Home / Beranda Screen
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#DBF5FC" barStyle="dark-content" />

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Figma Group 55: White rounded header bar */}
        <HeaderSection
          username="User"
          onRefresh={handleRefresh}
          loading={loading}
        />

        {/* Figma Group 56: Search Bar */}
        <SearchBarSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Figma Group 58: Summary Cards */}
        <SummaryCardsSection
          totalTransaksi={summary.total_transaksi}
          totalNominal={summary.total_pengeluaran}
        />

        {/* Figma Group 59: Category Section */}
        <CategorySection
          kategoriList={kategoriList}
          selectedKategoriId={selectedKategoriId}
          onSelectKategori={setSelectedKategoriId}
        />

        {/* Figma Group 60: Transaction List */}
        <TransactionListSection
          items={pengeluaranList}
          title="Catatan Terbaru"
          onDetail={setDetailItem}
          onEdit={handleOpenEditModal}
          onDelete={handlePromptDelete}
          onAddNew={handleOpenCreateModal}
        />
      </ScrollView>

      {/* Figma Group 41: Muat Ulang floating button (Rectangle 21: 149x47, rx=23.5, bg #98CCFF) */}
      <TouchableOpacity style={styles.floatingRefreshBtn} onPress={handleRefresh} activeOpacity={0.8}>
        <RefreshCw size={16} color="#000000" style={{ marginRight: 6 }} />
        <Text style={styles.floatingRefreshText}>Muat Ulang</Text>
      </TouchableOpacity>

      {/* Figma Group 76: Bottom Navigation Bar */}
      <BottomNavSection
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onOpenCreate={handleOpenCreateModal}
      />

      {/* SECTION: Form Modal (Buat & Edit Catatan) */}
      <CatatanFormModal
        visible={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handlePromptSave}
        onValidationFailed={() => setAlertState({ type: 'lack-info' })}
        editingItem={editingItem}
        kategoriList={kategoriList}
        onChangeTab={(tab) => {
          setIsFormModalOpen(false);
          setActiveTab(tab);
        }}
        activeTab={editingItem ? activeTab : 'Buat Catatan'}
      />

      {/* SECTION: Modal Konfirmasi */}
      <ConfirmModal
        visible={!!confirmState}
        type={confirmState?.type || 'delete'}
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmState(null)}
      />

      {/* SECTION: Modal Alert Toast */}
      <CustomToast
        alertState={alertState}
        onClose={() => setAlertState(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBF5FC',
  },
  scrollContainer: {
    flex: 1,
  },
  floatingRefreshBtn: {
    position: 'absolute',
    bottom: 90, // above the bottom nav
    right: 12,
    backgroundColor: '#98CCFF',
    flexDirection: 'row',
    alignItems: 'center',
    width: 149,
    height: 47,
    borderRadius: 23.5,
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  floatingRefreshIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  floatingRefreshText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
});

