import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, Tabs, Tab, Paper } from '@mui/material';

const AuthPage = () => {
  const [tab, setTab] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', senha: '' });
  const [registerData, setRegisterData] = useState({ nome: '', email: '', senha: '' });
  const [error, setError] = useState(null);

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
    setError(null);
  };

  const handleLoginChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = e => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLogin = e => {
    e.preventDefault();
    // Simulação de login
    if (loginData.email && loginData.senha) {
      setError(null);
      // redirecionar ou autenticar
      alert('Login efetuado!');
    } else {
      setError('Preencha todos os campos.');
    }
  };

  const handleRegister = e => {
    e.preventDefault();
    // Simulação de registro
    if (registerData.nome && registerData.email && registerData.senha) {
      setError(null);
      // redirecionar ou registrar
      alert('Registro efetuado!');
    } else {
      setError('Preencha todos os campos.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'transparent',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 380,
          width: '100%',
          p: 4,
          bgcolor: 'rgba(255, 245, 230, 0.97)',
          borderRadius: 4,
          border: '2px solid #e57300',
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/food.png")',
          backgroundRepeat: 'repeat',
          boxShadow: 6,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, gap: 1 }}>
          <span role="img" aria-label="pizza" style={{ fontSize: 32 }}>🍕</span>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#b71c1c', letterSpacing: 1 }}>
            Pizzaria Login
          </Typography>
        </Box>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            mb: 2,
            '& .MuiTab-root': { fontWeight: 600, color: '#b71c1c' },
            '& .Mui-selected': { color: '#ff9800 !important' },
            '& .MuiTabs-indicator': { backgroundColor: '#ff9800' },
          }}
        >
          <Tab label="Entrar" />
          <Tab label="Registrar" />
        </Tabs>
        {tab === 0 && (
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              label="E-mail"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              fullWidth
              margin="normal"
              required
              sx={{ bgcolor: '#fff8e1', borderRadius: 2 }}
            />
            <TextField
              label="Senha"
              name="senha"
              type="password"
              value={loginData.senha}
              onChange={handleLoginChange}
              fullWidth
              margin="normal"
              required
              sx={{ bgcolor: '#fff8e1', borderRadius: 2 }}
            />
            {error && <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>{error}</Alert>}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: 2,
                background: 'linear-gradient(90deg, #ff9800 0%, #ff5722 100%)',
                color: 'white',
                boxShadow: 2,
                transition: 'background 0.3s, box-shadow 0.3s',
                '&:hover': {
                  background: 'linear-gradient(90deg, #ff7043 0%, #d84315 100%)',
                  boxShadow: 4,
                },
              }}
            >
              Entrar
            </Button>
          </Box>
        )}
        {tab === 1 && (
          <Box component="form" onSubmit={handleRegister}>
            <TextField
              label="Nome"
              name="nome"
              value={registerData.nome}
              onChange={handleRegisterChange}
              fullWidth
              margin="normal"
              required
              sx={{ bgcolor: '#fff8e1', borderRadius: 2 }}
            />
            <TextField
              label="E-mail"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              fullWidth
              margin="normal"
              required
              sx={{ bgcolor: '#fff8e1', borderRadius: 2 }}
            />
            <TextField
              label="Senha"
              name="senha"
              type="password"
              value={registerData.senha}
              onChange={handleRegisterChange}
              fullWidth
              margin="normal"
              required
              sx={{ bgcolor: '#fff8e1', borderRadius: 2 }}
            />
            {error && <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>{error}</Alert>}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: 2,
                background: 'linear-gradient(90deg, #ff9800 0%, #ff5722 100%)',
                color: 'white',
                boxShadow: 2,
                transition: 'background 0.3s, box-shadow 0.3s',
                '&:hover': {
                  background: 'linear-gradient(90deg, #ff7043 0%, #d84315 100%)',
                  boxShadow: 4,
                },
              }}
            >
              Registrar
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AuthPage;
