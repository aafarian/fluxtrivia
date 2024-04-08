import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import triviaData from '../../triviaData.json';

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [customCategory, setCustomCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      // const response = await fetch('/triviaData.json'); // Adjust the path if necessary
      // const data = await response.json();
      const data = triviaData;
      setCategories(data.categories);
    };

    fetchCategories();
  }, []);

  const handleSelectCategory = (categoryId) => {
    navigate(`/trivia/${categoryId}`);
  };

  const handleCustomCategorySubmit = (event) => {
    if (customCategory) {
      // Navigate to TriviaPage with the custom category as a parameter or state
      navigate(`/trivia/custom?category=${encodeURIComponent(customCategory)}`);
    }
  };

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Select a Category</Typography>
      <Button
        variant="outlined"
        color="secondary"
        sx={{ mb: 2, width: '50%', fontSize: '1rem' }}
        onClick={() => handleSelectCategory('random')}
      >
        Random
      </Button>
      {
        categories.map((category) => (
          <Button
            key={category.categoryId}
            variant="outlined"
            sx={{ mb: 1, width: '50%', fontSize: '1rem' }}
            onClick={() => handleSelectCategory(category.categoryId)}
          >
            {category.categoryName}
          </Button>
        ))
      }
      <form onSubmit={handleCustomCategorySubmit}>
        <TextField
          label="Custom Category"
          variant="outlined"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box >
  );
}

export default CategoriesPage;
