import React, { useState, useRef } from 'react';
import { data } from '../data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        option_array[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }

    setTimeout(() => {
      // Reset classes and unlock options
      option_array.forEach((optionRef) => {
        if (optionRef.current) {
          optionRef.current.classList.remove("correct", "wrong");
        }
      });
      setLock(false);

      if (index + 1 < data.length) {
        setIndex((prevIndex) => prevIndex + 1);
        setQuestion(data[index + 1]);
      } else {
        setResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setResult(false);
  };

  return (
    <div className='container'>
      {result ? (
        <div>
          <h1>Quiz Result</h1>
          <p>Your score is: {score} out of {data.length}</p>
          <button onClick={resetQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <h1>Quiz app</h1>
          <hr />
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
            <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
            <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
            <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
          </ul>

          <div className='index'>{index + 1} of {data.length} questions</div>
        </>
      )}
    </div>
  );
};

export default Quiz;
