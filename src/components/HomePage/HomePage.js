import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

function HomePage() {
  return (
    <Box sx={{
      mt: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& a': { textDecoration: 'none' }
    }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Welcome to the Trivia Challenge!</Typography>
      {/* Update the Link to use a Button that navigates to the Categories page */}
      <Button variant="contained" color="primary" component={Link} to="/categories" sx={{ fontSize: '1rem' }}>
        Start Quiz
      </Button>
    </Box>
  );
}

export default HomePage;
