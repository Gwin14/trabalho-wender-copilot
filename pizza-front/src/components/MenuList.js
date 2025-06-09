// Componente para listar itens do menu de pizzas
import React, { useEffect, useState } from 'react';
import { getMenu } from '../services/api';
import { CircularProgress, List, ListItem, ListItemText, Button, Typography, Box } from '@mui/material';

const MenuList = ({ onSelect, onAdd }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMenu()
      .then((res) => {
        setMenu(res.data);
        setError(null);
      })
      .catch(() => {
        // Dados mockados para fallback
        setMenu([
          { id: 1, nome: 'Margherita', preco: 30 },
          { id: 2, nome: 'Calabresa', preco: 35 },
          { id: 3, nome: 'Quatro Queijos', preco: 40 }
        ]);
        setError(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh"><CircularProgress color="primary" size={48} /></Box>;
  if (error) return <Typography color="error" sx={{textAlign:'center', mt:4, fontWeight:600}}>{error}</Typography>;

  return (
    <Box
      sx={{
        maxWidth: 600,
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{
          fontWeight: 700,
          color: '#b71c1c',
          letterSpacing: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}>
          <span role="img" aria-label="pizza">🍕</span>
          Menu de Pizzas
        </Typography>
        <Button variant="contained" color="primary" onClick={onAdd} sx={{
          fontWeight: 600,
          borderRadius: 2,
          boxShadow: 2,
          background: 'linear-gradient(90deg, #ff9800 0%, #ff5722 100%)',
          color: 'white',
          transition: 'background 0.3s, box-shadow 0.3s',
          '&:hover': { background: 'linear-gradient(90deg, #ff7043 0%, #d84315 100%)', boxShadow: 4 }
        }}>Adicionar Pizza</Button>
      </Box>
      <List>
        {menu.map((item) => (
          <ListItem
            button
            key={item.id}
            onClick={() => onSelect(item.id)}
            sx={{
              borderRadius: 2,
              mb: 1,
              background: '#fff8e1',
              border: '1px solid #ffe0b2',
              transition: 'background 0.2s, box-shadow 0.2s',
              '&:hover': {
                bgcolor: '#ffb74d',
                boxShadow: 2,
                color: 'white',
              },
            }}
            aria-label={`Ver detalhes da pizza ${item.nome}`}
          >
            <ListItemText
              primary={<Typography sx={{ fontWeight: 600, fontSize: '1.1rem', color: '#b71c1c' }}>{item.nome}</Typography>}
              secondary={<Typography sx={{ color: '#ff9800', fontWeight: 500 }}>{`R$ ${item.preco}`}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MenuList;
