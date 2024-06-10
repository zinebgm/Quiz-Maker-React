import React from 'react';
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import he from 'he';

export function QuizQuestions({ category, difficulty }) {
  const [questions, setQuestions] = useState([]);
  const [choosenAnswers, setchoosenAnswers] = useState([]);
  const [submitVisible, setSubmitVisible] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
        );
        const data = await response.json();
        const questionsWithRandomizedAnswers = data.results.map((question) => ({
          ...question,
          question: he.decode(question.question),
          answers: [
            ...question.incorrect_answers,
            question.correct_answer,
          ].sort(() => Math.random() - 0.5),
        }));
        setQuestions(questionsWithRandomizedAnswers);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [category, difficulty]);

  function handleClikedAnswer(questionIndex, answer) {
    const newChoosenAnswers = [...choosenAnswers];
    newChoosenAnswers[questionIndex] = answer;
    setchoosenAnswers(newChoosenAnswers);
    setSubmitVisible(newChoosenAnswers.length === 5);
  }

  function handleSubmit() {
    history.push("/result", { questions, choosenAnswers });
  }

  return (
    <div>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className={{marginTop: "15px", marginBottom: "15px", textAlign: "left", marginLeft: "30%"}}>
          <p>{question.question}</p>
          {question.answers.map((answer, answerIndex) => (
            <button
              key={answerIndex}
              className={`btn ${
                choosenAnswers[questionIndex] === answer
                  ? "btn-success"
                  : "btn-outline-success"
              }`}
              style={{ marginRight: "10px" }} 
              onClick={() => handleClikedAnswer(questionIndex, answer)}
            >
              {answer}
            </button>
          ))}
        </div>
      ))}
      {submitVisible && (
        <button className="btn btn-secondary" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
}

export default QuizQuestions;
