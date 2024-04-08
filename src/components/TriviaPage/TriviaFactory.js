import React from 'react';
import { useParams } from 'react-router-dom';
import CustomCategoryQuestionGenerator from './Components/CustomCategoryGenerator';
import RandomCategoryQuestionGenerator from './Components/RandomCategoryGenerator';
import ListedCategoryQuestionGenerator from './Components/ListedCategoryQuestionGenerator';

function TriviaFactory() {
  const { categoryId } = useParams();

  if (categoryId === 'custom') {
    return <CustomCategoryQuestionGenerator />
  }

  if (categoryId === 'random') {
    return <RandomCategoryQuestionGenerator />
  }

  else {
    return <ListedCategoryQuestionGenerator />
  }
}

export default TriviaFactory;
