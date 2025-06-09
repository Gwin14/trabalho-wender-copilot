// Página para adicionar ou editar item do menu
import React, { useState } from 'react';
import { addMenuItem, updateMenuItem } from '../services/api';
import MenuForm from '../components/MenuForm';
import { Box, Snackbar, Alert } from '@mui/material';

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
    <Box
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: { xs: 2, sm: 6 },
        p: { xs: 2, sm: 4 },
        bgcolor: 'rgba(255, 245, 230, 0.97)',
        borderRadius: 4,
        boxShadow: 4,
        border: '2px solid #e57300',
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/food.png")',
        backgroundRepeat: 'repeat',
        transition: 'box-shadow 0.3s',
        '&:hover': { boxShadow: 8 },
      }}
    >
      <MenuForm initialData={initialData} onSubmit={handleSubmit} onCancel={onCancel} loading={loading} error={error} />
      <Snackbar open={success} autoHideDuration={2000} onClose={() => setSuccess(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" sx={{ fontWeight: 600, borderRadius: 2 }}>Salvo com sucesso!</Alert>
      </Snackbar>
    </Box>
  );
};

export default MenuFormPage;
