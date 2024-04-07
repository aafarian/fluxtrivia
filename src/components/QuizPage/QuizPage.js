import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'; // Ensure axios is installed for HTTP requests
import triviaData from '../../triviaData.json'; // Adjust the path as necessary

function QuizPage() {
  const { categoryId } = useParams();
  const location = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Added state for tracking current question index
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const fetchCustomCategoryQuestion = (customCategory) => {
    axios.get(`http://localhost:3001/get-question?category=${encodeURIComponent(customCategory)}`)
      .then(response => {
        const questionsArray = response.data.questions;
        const randomQuestionIndex = Math.floor(Math.random() * questionsArray.length);
        setCurrentQuestion(questionsArray[randomQuestionIndex])
      })
      .catch(error => console.error("Failed to fetch custom category question:", error));
  };

  useEffect(() => {
    if (categoryId !== 'custom') {
      const category = triviaData.categories.find(c => c.categoryId === categoryId);
      if (category && category.questions.length > 0) {
        setCurrentQuestion(category.questions[currentQuestionIndex]); // Use the currentQuestionIndex to select the question
        setExplanation(null);
        setSelectedAnswer('');
      }
    } else {
      const params = new URLSearchParams(location.search);
      const customCategory = params.get('category');
      fetchCustomCategoryQuestion(customCategory);
    }
  }, [categoryId, location.search, currentQuestionIndex]); // Add currentQuestionIndex as a dependency

  const handleSelectAnswer = (answerId) => {
    setSelectedAnswer(answerId);
    setExplanation(currentQuestion.explanation);
  };

  const getButtonStyles = (answer) => {
    const isCorrectAnswer = answer === currentQuestion.correctAnswerId;
    const isSelected = answer === selectedAnswer;
    const hasIncorrectAnswerBeenSelected = selectedAnswer && selectedAnswer !== currentQuestion.correctAnswerId;

    // Default styles for all buttons, ensuring bright black text for clarity
    let styles = {
      margin: '8px',
      borderColor: '#c4c4c4', // Neutral border color for unselected answers
      color: '#000000', // Bright black text color for all buttons
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)', // Slightly darker on hover for all buttons
      },
      fontWeight: 'bold',
    };

    if (isSelected && !isCorrectAnswer) {
      // Incorrect answer selected
      styles = {
        ...styles,
        '&.Mui-disabled': {
          color: '#000', // Ensures text remains bright
          borderColor: isCorrectAnswer ? '#4caf50' : '#f44336',
          bgcolor: isCorrectAnswer ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
          '.MuiButton-endIcon': {
            color: isCorrectAnswer ? '#4caf50' : '#f44336', // Icon color matches the border
          },
        },
        bgcolor: '#f44336', // Bright red background for incorrect answer
        borderColor: '#f44336', // Matching border color
      };
    } else if (isCorrectAnswer && (isSelected || hasIncorrectAnswerBeenSelected)) {
      // Correct answer or correct answer when incorrect is selected
      styles = {
        ...styles,
        '&.Mui-disabled': {
          color: '#000', // Ensures text remains bright
          borderColor: isCorrectAnswer ? '#4caf50' : '#f44336',
          bgcolor: isCorrectAnswer ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
          '.MuiButton-endIcon': {
            color: isCorrectAnswer ? '#4caf50' : '#f44336', // Icon color matches the border
          },
        },
        bgcolor: '#4caf50', // Bright green background for correct answer
        borderColor: '#4caf50', // Matching border color
      };
    }

    return styles;
  };

  const renderAnswerIcon = (answerId) => {
    if (!selectedAnswer) return null;
    if (answerId === currentQuestion.correctAnswerId) {
      return <CheckIcon sx={{ color: '#4caf50' }} />;
    } else if (answerId === selectedAnswer) {
      return <CloseIcon sx={{ color: '#f44336' }} />;
    }
    return null;
  };

  const handleNextQuestion = () => {
    const category = triviaData.categories.find(c => c.categoryId === categoryId);
    if (currentQuestionIndex < category.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to next question
    }
  };

  if (!currentQuestion) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {currentQuestion.question}
      </Typography>
      {currentQuestion.answers.map((answer, index) => (
        <Button
          key={index}
          variant="outlined"
          onClick={() => handleSelectAnswer(answer.answerId)}
          disabled={!!selectedAnswer}
          endIcon={renderAnswerIcon(answer.answerId)}
          sx={getButtonStyles(answer.answerId)} // Use getButtonStyles for styling
        >
          {answer.text}
        </Button>
      ))}
      <Typography sx={{ mt: 2 }}>{explanation}</Typography>
      {selectedAnswer && currentQuestionIndex < triviaData.categories.find(c => c.categoryId === categoryId).questions.length - 1 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextQuestion}
          sx={{ mt: 2 }}
        >
          Next Question
        </Button>
      )}
    </Box>
  );
}

export default QuizPage;
