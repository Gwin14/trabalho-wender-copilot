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

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh"><CircularProgress color="primary" size={48} /></Box>;
  if (error) return <Typography color="error" sx={{textAlign:'center', mt:4, fontWeight:600}}>{error}</Typography>;
  if (!item) return null;

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
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
      aria-label={`Detalhes da pizza ${item.nome}`}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: '#b71c1c',
          letterSpacing: 1,
          textAlign: 'center',
          mb: 2,
          transition: 'color 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <span role="img" aria-label="pizza">🍕</span>
        {item.nome}
      </Typography>
      <Typography variant="h6" sx={{color:'#ff9800', fontWeight:700, mb:1}}>
        Preço: <Box component="span" sx={{color:'#b71c1c', fontWeight:700}}>R$ {item.preco}</Box>
      </Typography>
      <Typography variant="body1" sx={{mb:2, color:'#6d4c41'}}>
        {item.descricao || <Box component="span" sx={{color:'text.disabled', fontStyle:'italic'}}>Sem descrição</Box>}
      </Typography>
      <Box mt={2} display="flex" gap={2} sx={{flexDirection:{xs:'column',sm:'row'}, justifyContent:'center'}}>
        <Button
          variant="contained"
          color="primary"
          onClick={onBack}
          sx={{
            flex:1,
            py:1.2,
            fontWeight:600,
            fontSize:'1rem',
            borderRadius:2,
            boxShadow:2,
            transition:'background 0.3s, box-shadow 0.3s',
            '&:hover':{backgroundColor:'primary.dark', boxShadow:4},
          }}
        >Voltar</Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => onEdit(item)}
          sx={{
            flex:1,
            py:1.2,
            fontWeight:600,
            fontSize:'1rem',
            borderRadius:2,
            borderColor:'secondary.main',
            color:'secondary.main',
            transition:'color 0.3s, border-color 0.3s, background 0.3s',
            '&:hover':{backgroundColor:'secondary.light', color:'white', borderColor:'secondary.dark'},
          }}
        >Editar</Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setConfirmOpen(true)}
          sx={{
            flex:1,
            py:1.2,
            fontWeight:600,
            fontSize:'1rem',
            borderRadius:2,
            borderColor:'error.main',
            color:'error.main',
            transition:'color 0.3s, border-color 0.3s, background 0.3s',
            '&:hover':{backgroundColor:'error.light', color:'white', borderColor:'error.dark'},
          }}
        >Excluir</Button>
      </Box>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} aria-labelledby="dialog-title" aria-describedby="dialog-desc">
        <DialogTitle id="dialog-title">Confirmar exclusão</DialogTitle>
        <DialogContent id="dialog-desc">Tem certeza que deseja excluir este item?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} autoFocus>Cancelar</Button>
          <Button color="error" onClick={handleDelete}>Excluir</Button>
        </DialogActions>
        {deleteError && <Typography color="error" sx={{p:2}}>{deleteError}</Typography>}
      </Dialog>
    </Box>
  );
};

export default MenuDetailPage;
