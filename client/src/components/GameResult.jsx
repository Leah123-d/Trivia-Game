import { useState } from 'react'

//prop that will be passsed to this component will be the data from the call back function to this component to display the score and reset button

function GameResult ({correctScore,wrongScore, restartQuiz}) {
  const [gameReset, setGameReset] = useState("") //might need a call back function to take the user to hte game setup page

  return (
    <p>Game Results</p>

  )
}

export default GameResult