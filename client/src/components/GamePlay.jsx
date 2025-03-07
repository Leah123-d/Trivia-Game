function GamePlay ({gameData}) {

  console.log("GameData prop: ", gameData);

  return(
    <div>
    <p>{gameData.question}</p>
    <p>{Array.isArray(gameData.correct_answer) ? gameData.correct_answer[0] : gameData.correct_answer}</p>
      {Array.isArray(gameData.incorrect_answers) && 
        gameData.incorrect_answers.map((answers, index) => (
          <p key={index}>{gameData.correct_answer}</p>
        ))}
    </div>
  )
}

export default GamePlay