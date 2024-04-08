import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import TriviaEngine from '../TriviaEngine';

function CustomCategoryQuestionGenerator() {
  const { categoryId } = useParams();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const customCategory = params.get('category');
    fetchCustomCategoryQuestion(customCategory);
    setCategory(customCategory);
  }, [categoryId, location.search]);

  const fetchCustomCategoryQuestion = (customCategory) => {
    axios.get(`http://localhost:3001/get-question?category=${encodeURIComponent(customCategory)}`)
      .then(response => {
        const questionsArray = response.data.questions;
        const randomQuestionIndex = Math.floor(Math.random() * questionsArray.length);
        setCurrentQuestion(questionsArray[randomQuestionIndex])
      })
      .catch(error => console.error("Failed to fetch custom category question:", error));
  };

  const handleNextQuestion = () => {
    // TODO: Make this generate another question
    console.log('1111 handling next question IN CUSTOM: ', category);
    setCurrentQuestion(null);
    fetchCustomCategoryQuestion(category)
  };

  return <TriviaEngine category={category} currentQuestion={currentQuestion} handleNextQuestion={handleNextQuestion} customCta={"Generate another"} />
}

export default CustomCategoryQuestionGenerator;
