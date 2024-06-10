import React from 'react';
import { useLocation, Link } from "react-router-dom";

export function QuizResult() {
  const location = useLocation();
  const { questions, choosenAnswers } = location.state;

  const correctAnswers = questions.map(question => question.correct_answer);
  const score = choosenAnswers.filter((answer, index) => answer === correctAnswers[index]).length;


  return (
    <div className='centered-div'>
      <h4>RESULTS</h4>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="question">
          <p>{question.question}</p>
          {question.answers.map((answer, answerIndex) => {
            const isSelected = choosenAnswers.includes(answer);

            const isActualCorrectAnswer = answer === question.correct_answer;

            return (
              <button
                key={answerIndex}
                style={{ marginRight: "10px" }}
                className={
                  isSelected
                    ? isActualCorrectAnswer
                      ? "btn btn-success"
                      : "btn btn-danger"
                    : isActualCorrectAnswer
                    ? "btn btn-success"
                    : "btn btn-outline-success"
                }
              >
                {answer}
              </button>
            );
          })}
        </div>
      ))}
      <div className="score">
        <p
          style={{
            backgroundColor: colorScale(score),
            padding: "10px",
            borderRadius: "5px",
            color: "black",
          }}
        >
          You scored {score} out of {questions.length}
        </p>
      </div>

      <Link to="/" className="btn btn-secondary">
        Create a New Quiz
      </Link>
    </div>
  );
}

function colorScale(score) {
    if (score <= 1) {
      return 'red';
    } else if (score >= 2 && score < 4) {
      return 'yellow';
    } else if ( score >= 4){
      return 'green';
    }
  }

export default QuizResult;

