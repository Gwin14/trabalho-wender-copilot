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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        p: 3,
        bgcolor: 'rgba(255, 245, 230, 0.95)', // tom creme quente
        borderRadius: 3,
        boxShadow: 3,
        border: '2px solid #e57300', // laranja queimado
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/food.png")',
        backgroundRepeat: 'repeat',
        transition: 'box-shadow 0.3s',
        '&:hover': {
          boxShadow: 6,
        },
        '@media (max-width:600px)': {
          maxWidth: '100%',
          p: 2,
        },
      }}
      aria-label={initialData ? 'Editar Pizza' : 'Adicionar Pizza'}
    >
      <Typography
        variant="h5"
        mb={2}
        sx={{
          fontWeight: 700,
          color: '#b71c1c', // vermelho escuro
          letterSpacing: 1,
          textAlign: 'center',
          transition: 'color 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <span role="img" aria-label="pizza">🍕</span>
        {initialData ? 'Editar Pizza' : 'Adicionar Pizza'}
      </Typography>
      <TextField
        label="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
        fullWidth
        required
        margin="normal"
        autoComplete="off"
        inputProps={{
          'aria-label': 'Nome da pizza',
        }}
        sx={{
          bgcolor: '#fff8e1',
          borderRadius: 2,
          transition: 'background 0.3s',
        }}
      />
      <TextField
        label="Preço"
        value={preco}
        onChange={e => setPreco(e.target.value)}
        fullWidth
        required
        margin="normal"
        type="number"
        inputProps={{ step: '0.01', 'aria-label': 'Preço da pizza', min: 0 }}
        sx={{
          bgcolor: '#fff8e1',
          borderRadius: 2,
          transition: 'background 0.3s',
        }}
      />
      <TextField
        label="Descrição"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={3}
        inputProps={{ 'aria-label': 'Descrição da pizza' }}
        sx={{
          bgcolor: '#fff8e1',
          borderRadius: 2,
          transition: 'background 0.3s',
        }}
      />
      {error && (
        <Alert
          severity="error"
          sx={{ mt: 2, borderRadius: 2, fontWeight: 500 }}
          role="alert"
        >
          {error}
        </Alert>
      )}
      <Box
        mt={2}
        display="flex"
        gap={2}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{
            flex: 1,
            py: 1.2,
            fontWeight: 600,
            fontSize: '1rem',
            borderRadius: 2,
            boxShadow: 2,
            background: 'linear-gradient(90deg, #ff9800 0%, #ff5722 100%)',
            color: 'white',
            transition: 'background 0.3s, box-shadow 0.3s',
            '&:hover': {
              background: 'linear-gradient(90deg, #ff7043 0%, #d84315 100%)',
              boxShadow: 4,
            },
          }}
        >
          {initialData ? 'Salvar' : 'Adicionar'}
        </Button>
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={loading}
          sx={{
            flex: 1,
            py: 1.2,
            fontWeight: 600,
            fontSize: '1rem',
            borderRadius: 2,
            color: '#b71c1c',
            borderColor: '#b71c1c',
            transition: 'color 0.3s, border-color 0.3s, background 0.3s',
            '&:hover': {
              backgroundColor: '#ffebee',
              color: 'white',
              borderColor: '#d84315',
              background: 'linear-gradient(90deg, #ff7043 0%, #d84315 100%)',
            },
          }}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default MenuForm;
