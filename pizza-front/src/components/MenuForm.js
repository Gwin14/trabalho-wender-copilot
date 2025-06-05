// Formulário para adicionar ou editar item do menu
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

const MenuForm = ({ initialData, onSubmit, onCancel, loading, error }) => {
  const [nome, setNome] = useState(initialData?.nome || '');
  const [preco, setPreco] = useState(initialData?.preco || '');
  const [descricao, setDescricao] = useState(initialData?.descricao || '');

  useEffect(() => {
    setNome(initialData?.nome || '');
    setPreco(initialData?.preco || '');
    setDescricao(initialData?.descricao || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome, preco, descricao });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{maxWidth:400}}>
      <Typography variant="h6" mb={2}>{initialData ? 'Editar Pizza' : 'Adicionar Pizza'}</Typography>
      <TextField label="Nome" value={nome} onChange={e => setNome(e.target.value)} fullWidth required margin="normal" />
      <TextField label="Preço" value={preco} onChange={e => setPreco(e.target.value)} fullWidth required margin="normal" type="number" inputProps={{ step: '0.01' }} />
      <TextField label="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} fullWidth margin="normal" multiline rows={3} />
      {error && <Alert severity="error" sx={{mt:2}}>{error}</Alert>}
      <Box mt={2} display="flex" gap={2}>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>{initialData ? 'Salvar' : 'Adicionar'}</Button>
        <Button variant="outlined" onClick={onCancel} disabled={loading}>Cancelar</Button>
      </Box>
    </Box>
  );
};

export default MenuForm;
