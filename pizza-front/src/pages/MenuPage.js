// Página principal para navegação entre listagem, detalhes e formulários
import React, { useState } from 'react';
import MenuList from '../components/MenuList';
import MenuDetailPage from './MenuDetailPage';
import MenuFormPage from './MenuFormPage';
import { Box, Snackbar, Alert } from '@mui/material';

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
    <Box p={3}>
      {!showForm && !selectedId && <MenuList key={refresh} onSelect={handleSelect} onAdd={handleAdd} />}
      {selectedId && !showForm && (
        <MenuDetailPage id={selectedId} onBack={handleCancel} onEdit={handleEdit} onDeleted={handleDeleted} />
      )}
      {showForm && (
        <MenuFormPage initialData={editData} onSaved={handleSaved} onCancel={handleCancel} />
      )}
      <Snackbar open={!!successMsg} autoHideDuration={2000} onClose={() => setSuccessMsg('')}>
        <Alert severity="success">{successMsg}</Alert>
      </Snackbar>
    </Box>
  );
};

export default MenuPage;
