//prop that will be passsed to this component will be the data from the 
//call back function to this component to display the score and reset button

function GameResult ({ correctScore, wrongScore, onRestart }) {

  return (
    <div className="socre-container">
      <h2>Quiz Completed!</h2>
        <p>correct answers! {correctScore}</p>
        <p>wrong answers! {wrongScore}</p>
        <button className="btn btn-soft btn-accent" onClick={onRestart}>
          Restart
        </button>
    </div>

  )
}

export default GameResult