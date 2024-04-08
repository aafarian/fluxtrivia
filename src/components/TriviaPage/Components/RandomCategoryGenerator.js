import React, { useState, useEffect } from 'react';
import triviaData from '../../../triviaData.json';
import TriviaEngine from '../TriviaEngine';

function RandomCategoryQuestionGenerator() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const shuffleQuestions = (questions) => {
    let currentIndex = questions.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = questions[currentIndex];
      questions[currentIndex] = questions[randomIndex];
      questions[randomIndex] = temporaryValue;
    }

    return questions;
  };

  useEffect(() => {
    const aggregatedQuestions = shuffleQuestions(triviaData.categories.flatMap(c => c.questions));
    setAllQuestions(aggregatedQuestions);

    if (aggregatedQuestions.length > 0) {
      const randomQuestionIndex = Math.floor(Math.random() * aggregatedQuestions.length);
      setCurrentQuestion(aggregatedQuestions[randomQuestionIndex]);
    }
  }, []);

  const handleNextQuestion = () => {
    if (allQuestions.length > 0) {
      const randomQuestionIndex = Math.floor(Math.random() * allQuestions.length);
      setCurrentQuestion(allQuestions[randomQuestionIndex]);
    }
  };

  return <TriviaEngine currentQuestion={currentQuestion} handleNextQuestion={handleNextQuestion} />
}

export default RandomCategoryQuestionGenerator;
