import { useState, useRef } from 'react'

function GamePlay ({ gameData, updateScore, onShowScore }) {

  const [questionIndex, setQuestionIndex] = useState(0);
  const isAnswered = useRef(false);
  const feedbackRef = useRef("");



  if (!gameData || !gameData.results || gameData.results.length === 0) {
    return <p>Loading game...</p>; // Prevents errors if gameData is undefined or empty
  }
  // console.log("GameData prop: ", gameData);

  const currentQuestion = gameData.results[questionIndex];

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  //decoded the question to remove HTML entities

  const decodedQuestion = decodeHtml(currentQuestion.question);
  const decodedAnswers = [
    ...currentQuestion.incorrect_answers.map(decodeHtml), 
    decodeHtml(currentQuestion.correct_answer)].sort(() => Math.random() - 0.5);


  const handleClick = (selectedAnswer) => {
    if (isAnswered.current) 
      return;
    if(selectedAnswer === currentQuestion.correct_answer){
      feedbackRef.current = "correct!"
      updateScore(true);
    } else {
      feedbackRef.current = "incorrect!"
      updateScore(false);
    }
    isAnswered.current = true

  } 

  const handleNextQuestion = () => {
      if(questionIndex < gameData.results.length - 1) {
        setQuestionIndex((prevIndex => prevIndex + 1));
        feedbackRef.current="";
        isAnswered.current = false;
      } else{
        onShowScore()
      }
  };

  return(
    <div className="questionContainer">
      <div><h1>Quiz!</h1></div>
      <div>
        <p>{decodedQuestion}</p>

        {decodedAnswers.map((option, index) => (

        <button className="btn btn-soft btn-accent" 
                key={index} 
                onClick={() => handleClick(option)}
                disabled={isAnswered.current}
                >

        {option}
        
        </button>

        ))}
        <p>{feedbackRef.current}</p>

        <div className="question-container">

          
          {isAnswered.current && (
            <button className="btn btn-soft btn-accent" onClick={handleNextQuestion}>
            {questionIndex < gameData.results.length - 1 ? "Next Question" : "See Results"}

          </button>
          )}
        </div>

      </div>


    </div>
  )
}

export default GamePlay

