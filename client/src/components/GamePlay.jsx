import { useState, useRef } from 'react'

function GamePlay ({ gameData }) {

  //need to fix the next question button, it is not forwarding to the next question 
  //need to abstract the score portion to create it in its own component
  //this will need a call back function to feed the score to the parent to send to the sibling 

  const isAnswered = useRef(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showScore, setShowScore ] = useState(false);
  const [correctScore, setCorrectScore ] = useState(0);
  const [wrongScore, setWrongScore ] = useState(0);

  if (!gameData || !gameData.results || gameData.results.length === 0) {
    return <p>Loading game...</p>; // Prevents errors if gameData is undefined or empty
  }
  console.log("GameData prop: ", gameData);

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
      setFeedback("correct!");
      setCorrectScore(prevcorrectScore => prevcorrectScore +1);
      
    } else {
      setWrongScore(prevwrongScore => prevwrongScore +1);
      
    }
    
    isAnswered.current = true

  } 

  const handleNextQuestion = () => {
      if(questionIndex < gameData.results.length - 1) {
        setQuestionIndex((prevIndex => prevIndex + 1));
        setFeedback("");
        isAnswered.current = false;
      } else{
        setFeedback("quiz completed!");
        setShowScore(true);
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
        <p>{feedback}</p>

        <div className="score">

          
          {isAnswered.current && (
            <button className="btn btn-soft btn-accent"
            onClick={handleNextQuestion}>
            {questionIndex < gameData.results.length - 1 ? "Next Question" : "See Results"}
           
          </button>
          )}
        </div>

      </div>


    </div>
  )
}

export default GamePlay

{/* 
<div className="scoreResult">Corretly_answered: {correctScore}. You got  incorrect answers:{wrongScore}</div> */}