import { Box, Button, CircularProgress, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TriviaEngine({ handleNextQuestion, currentQuestion, customCta }) {
  const [explanation, setExplanation] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedAnswer('');
    setExplanation(null);
  }, [currentQuestion]);

  const handleSelectAnswer = (answerId) => {
    setSelectedAnswer(answerId);
    setExplanation(currentQuestion.explanation);
  };

  const handleClickNext = () => {
    setSelectedAnswer('');
    setExplanation(null);
    handleNextQuestion();
  }

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

  if (!currentQuestion) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {currentQuestion.categoryName} - {currentQuestion.question} - {currentQuestion.difficulty}
      </Typography>
      {currentQuestion.generatedBy &&
        <Typography sx={{ mt: 2 }}>Custom category and question submitted by {currentQuestion.generatedBy}</Typography>
      }
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
      {selectedAnswer && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickNext}
          sx={{ mt: 2 }}
        >
          {customCta || 'Next Question'}
        </Button>
      )}
      <Button
        key={`${(currentQuestion?.categoryId) || 'custom'}-button`}
        variant="outlined"
        sx={{ mb: 1, width: '50%', fontSize: '1rem' }}
        onClick={() => navigate('/categories')}
      >
        Back to categories
      </Button>
    </Box>
  );
}
export default TriviaEngine;