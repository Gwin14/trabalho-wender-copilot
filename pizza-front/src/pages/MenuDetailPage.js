// Página para exibir detalhes de um item do menu
import React, { useEffect, useState } from 'react';
import { getMenuItem, deleteMenuItem } from '../services/api';
import { Box, Typography, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const MenuDetailPage = ({ id, onBack, onEdit, onDeleted }) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMenuItem(id)
      .then((res) => {
        setItem(res.data);
        setError(null);
      })
      .catch(() => setError('Erro ao carregar detalhes.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    deleteMenuItem(id)
      .then(() => {
        setConfirmOpen(false);
        onDeleted();
      })
      .catch(() => setDeleteError('Erro ao excluir item.'));
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!item) return null;

  return (
    <Box>
      <Typography variant="h5">{item.nome}</Typography>
      <Typography>Preço: R$ {item.preco}</Typography>
      <Typography>Descrição: {item.descricao}</Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={onBack} sx={{mr:1}}>Voltar</Button>
        <Button variant="outlined" color="secondary" onClick={() => onEdit(item)}>Editar</Button>
        <Button variant="outlined" color="error" onClick={() => setConfirmOpen(true)} sx={{ml:1}}>Excluir</Button>
      </Box>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>Tem certeza que deseja excluir este item?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
          <Button color="error" onClick={handleDelete}>Excluir</Button>
        </DialogActions>
        {deleteError && <Typography color="error" sx={{p:2}}>{deleteError}</Typography>}
      </Dialog>
    </Box>
  );
};

export default MenuDetailPage;
