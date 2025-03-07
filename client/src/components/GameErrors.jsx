function GameErrors ({ errorHandle, onRestart }){ 
  return (
    <div>
    <p>No questions found with Search</p>
    <button className="btn btn-soft btn-accent" onClick={onRestart}>
          Create a new Search
        </button>
    </div>

  )

}

export default GameErrors