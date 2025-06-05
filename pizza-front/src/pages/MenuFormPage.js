// Página para adicionar ou editar item do menu
import React, { useState } from 'react';
import { addMenuItem, updateMenuItem } from '../services/api';
import MenuForm from '../components/MenuForm';
import { Box, Typography, Snackbar, Alert } from '@mui/material';

const MenuFormPage = ({ initialData, onSaved, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (data) => {
    setLoading(true);
    setError(null);
    const action = initialData ? updateMenuItem(initialData.id, data) : addMenuItem(data);
    action
      .then(() => {
        setSuccess(true);
        onSaved();
      })
      .catch(() => setError('Erro ao salvar item.'))
      .finally(() => setLoading(false));
  };

  return (
    <Box>
      <MenuForm initialData={initialData} onSubmit={handleSubmit} onCancel={onCancel} loading={loading} error={error} />
      <Snackbar open={success} autoHideDuration={2000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Salvo com sucesso!</Alert>
      </Snackbar>
    </Box>
  );
};

export default MenuFormPage;
