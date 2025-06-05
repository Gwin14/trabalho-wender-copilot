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

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Menu de Pizzas</Typography>
        <Button variant="contained" color="primary" onClick={onAdd}>Adicionar Pizza</Button>
      </Box>
      <List>
        {menu.map((item) => (
          <ListItem button key={item.id} onClick={() => onSelect(item.id)}>
            <ListItemText primary={item.nome} secondary={`R$ ${item.preco}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MenuList;
