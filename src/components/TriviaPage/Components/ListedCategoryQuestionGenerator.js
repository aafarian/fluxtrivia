import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import triviaData from '../../../triviaData.json';
import TriviaEngine from '../TriviaEngine';

function ListedCategoryQuestionGenerator() {
  const { categoryId } = useParams();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [category, setCategory] = useState(null);


  useEffect(() => {
    const category = triviaData.categories.find(c => c.categoryId === categoryId);
    setCategory(category);
    if (category && category.questions.length > 0) {
      const randomQuestionIndex = Math.floor(Math.random() * category.questions.length);
      setCurrentQuestion(category.questions[randomQuestionIndex]);
    }
  }, [categoryId, location.search]);

  const handleNextQuestion = () => {
    console.log('1111 handling next question IN LISTED CATEGORY: ');
    const randomQuestionIndex = Math.floor(Math.random() * category.questions.length);
    setCurrentQuestion(category.questions[randomQuestionIndex]);
  };


  return <TriviaEngine category={category} currentQuestion={currentQuestion} handleNextQuestion={handleNextQuestion} />
}

export default ListedCategoryQuestionGenerator;
