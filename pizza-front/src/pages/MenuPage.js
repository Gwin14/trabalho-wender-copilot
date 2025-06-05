// Página principal para navegação entre listagem, detalhes e formulários
import React, { useState } from 'react';
import MenuList from '../components/MenuList';
import MenuDetailPage from './MenuDetailPage';
import MenuFormPage from './MenuFormPage';
import { Box, Snackbar, Alert } from '@mui/material';
import { GlobalStyles } from '@mui/system';

const MenuPage = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSelect = (id) => {
    setSelectedId(id);
    setShowForm(false);
    setEditData(null);
  };

  const handleAdd = () => {
    setShowForm(true);
    setEditData(null);
    setSelectedId(null);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setShowForm(true);
    setSelectedId(null);
  };

  const handleSaved = () => {
    setShowForm(false);
    setEditData(null);
    setRefresh(r => !r);
    setSuccessMsg('Operação realizada com sucesso!');
  };

  const handleDeleted = () => {
    setSelectedId(null);
    setRefresh(r => !r);
    setSuccessMsg('Item excluído com sucesso!');
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditData(null);
    setSelectedId(null);
  };

  return (
    <>
      <GlobalStyles styles={{
        body: {
          minHeight: '100vh',
          backgroundColor: 'rgba(255, 248, 225, 1)',
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/food.png")',
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed',
        }
      }} />
      <Box p={{ xs: 1, sm: 3 }} sx={{
        minHeight: '100vh',
      }}>
        {!showForm && !selectedId && <MenuList key={refresh} onSelect={handleSelect} onAdd={handleAdd} />}
        {selectedId && !showForm && (
          <MenuDetailPage id={selectedId} onBack={handleCancel} onEdit={handleEdit} onDeleted={handleDeleted} />
        )}
        {showForm && (
          <MenuFormPage initialData={editData} onSaved={handleSaved} onCancel={handleCancel} />
        )}
        <Snackbar open={!!successMsg} autoHideDuration={2000} onClose={() => setSuccessMsg('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="success" sx={{ fontWeight: 600, borderRadius: 2 }}>{successMsg}</Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default MenuPage;
