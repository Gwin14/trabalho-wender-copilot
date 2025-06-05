import React from 'react';
import MenuPage from './pages/MenuPage';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <MenuPage />
      </Container>
    </>
  );
}

export default App;
