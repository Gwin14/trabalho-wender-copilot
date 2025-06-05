import React from 'react';
import MenuPage from './pages/MenuPage';
import AuthPage from './pages/AuthPage';
import { CssBaseline, Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Container maxWidth="md">
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/*" element={<MenuPage />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
