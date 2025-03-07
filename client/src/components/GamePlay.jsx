function GamePlay ({gameData}) {
  // if(!gameData || !gameData.question) {
  //   return <p>Loading Game...</p>;
  // }

  console.log("GameData prop: ", gameData);
  // console.log("question 1", gameData.question[0])

 
  return(
    <div>
    <p>{gameData.question} questions</p>
    <p>Correct Answer: {gameData.correct_answer}</p>
    
    <h4>incorrect answers:</h4>
      {Array.isArray(gameData.incorrect_answers) && 
        gameData.incorrect_answers.map((answers, index) => (
          <p key={index}>{gameData.correct_answer}</p>
        ))}
    </div>
  )
}

export default GamePlay