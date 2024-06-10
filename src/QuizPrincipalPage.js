import React from 'react';
import { useState, useEffect } from "react";
import { QuizQuestions } from "./QuizQuestions";

export function QuizPrincipalPage() {
  const [choosenCategory, setChoosenCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const [choosenDifficulty, setChoosenDifficulty] = useState("");

  const [displayQuestions, setDisplayQuestions] = useState(false);

  const handleChangeCategory = (e) => {
    setChoosenCategory(e.target.value);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const data = await response.json();
        setCategories(data.trivia_categories);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleChangeDifficulty = (e) => {
    setChoosenDifficulty(e.target.value);
  };

  const handleFetchQuiz = () => {
    setDisplayQuestions(true);
  };

  return (
    <div className="center">
      <h5 className='h5'>QUIZ MAKER</h5>
      <div className="">
        <select className='select'
          id="categorySelect"
          onChange={handleChangeCategory}
          value={choosenCategory}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select className='select'
          id="difficultySelect"
          onChange={handleChangeDifficulty}
          value={choosenDifficulty}
        >
          <option value="">Select difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button className='button' id="createBtn" onClick={handleFetchQuiz}>
          Create
        </button>
        {displayQuestions && (
          <QuizQuestions
            category={choosenCategory}
            difficulty={choosenDifficulty}
          />
        )}
      </div>
    </div>
  );
}

export default QuizPrincipalPage;
