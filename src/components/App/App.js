import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import QuizPage from '../QuizPage/QuizPage';
import Box from '@mui/material/Box';
import CategoriesPage from '../CategoriesPage/CategoriesPage';

function App() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/quiz/:categoryId" element={<QuizPage />} />
      </Routes>
    </Box>
  );
}

export default App;
