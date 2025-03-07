import { useState, useRef, useEffect } from 'react'
import './App.css'
import GameSetup from './components/GameSetup'
import GamePlay from './components/GamePlay'
import GameResult from './components/GameResult'
import GameErrors from './components/GameErrors'

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
  const [errorHandle, setErrorHandle] = useState(false);

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

    if(data.response_code != 0){
      console.log("no results found");
      setErrorHandle(true);
    }

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
    setGameValues({ 
      amount: 0,
      category: 0,
      level: "",
      qtype:"",});
    setErrorHandle(false);
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

    {showScore ? (
       <GameResult 
       correctScore={correctScore}
       wrongScore={wrongScore}
       onRestart={restartQuiz}/>
  
      ):(isSubmitted && !loading && gameData && (
        <GamePlay 
          gameData={gameData}
          updateScore={updateScore}
          onShowScore={handleShowScore}
          />
        ))
      }
      {errorHandle ? 
      <GameErrors 
        errorHandle={errorHandle}
        onRestart={restartQuiz}
        /> : ""

      }
    </>
  )
}

export default App
