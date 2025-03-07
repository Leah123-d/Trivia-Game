import { useState, useRef, useEffect } from 'react'
import './App.css'
import GameSetup from './components/GameSetup'
import GamePlay from './components/GamePlay'
// import GameResult from './components/GameResult'

function App() {

  const [gameValues, setGameValues] = useState({
    amount: 0,
    category: 0,
    level: "",
    qtype:"",
  })

  const [gameData,setGameData] = useState(null); //stores fetched game data
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); //checking fetch status, to prevent game play from loading before fetch occurs
  const [correctScore, setCorrectScore ] = useState(0);
  const [wrongScore, setWrongScore ] = useState(0);
  const [showScore, setShowScore ] = useState(false);

  const handleChange = (e) => {
    setGameValues ({
      ...gameValues,
      [e.target.name]: e.target.value
    })
  }

  const fetchGameSetup = async () => {
    console.log("Game values submitted:", gameValues);
    setLoading(true);
    try{
    const response = await fetch(
      `/triviaGame?amount=${gameValues.amount}&category=${gameValues.category}&difficulty=${gameValues.level}&type=${gameValues.qtype}`); 

    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("fetched data:", data);
    setGameData(data); //storing the API response

    } catch(error){
    console.error("error fetching data: ", error);
    
    } finally{
      setLoading(false);
    } 
  
};

  useEffect(() => {
    if(isSubmitted) {
      fetchGameSetup();
      setIsSubmitted(true);
    }
  }, [isSubmitted]);


  const updateScore = (isCorrect) => {
    if(isCorrect){
      setCorrectScore((prevScore) => prevScore +1);
    }else {
      setWrongScore(prevwrongScore => prevwrongScore +1);
    }
  }
  
  const handleShowScore = () => {
    setShowScore(true);
  }

  const restartQuiz = () => {
    setCorrectScore(0);
    setWrongScore(0);
    setShowScore(false);
    setIsSubmitted(false);
  }





  return (
    <>
    {!isSubmitted && (
    <GameSetup 
      amount={gameValues.amount}
      category={gameValues.category}
      level={gameValues.level}
      qtype={gameValues.qtype}
      onChange={handleChange} 
      onSubmit={(e) => {
        e.preventDefault(); 
        setIsSubmitted(true);
      }}
    />
    )}

    {/* {gameData && <pre>{JSON.stringify(gameData, null, 2)}</pre>} */}

    {isSubmitted && !loading && gameData && 
      <GamePlay 
        gameData={gameData}
        updateScore={updateScore}
        onShowScore={handleShowScore}
        />}

      <GameResult 
        correctScore={correctScore}
        wrongScore={wrongScore}
        onRestart={restartQuiz}/>
    </>
  )
}

export default App
