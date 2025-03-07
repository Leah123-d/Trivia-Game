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

  const[gameData,setGameData] = useState(null); //stores fetched game data
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); //checking fetch status, to prevent game play from loading before fetch occurs



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

    {isSubmitted && !loading && gameData && <GamePlay 
                                                gameData={gameData}
                                                
                                                />}
    {/* <GamePlay 
                                                gameData={gameData}/> */}

  
     {/*will use game data to feed into game play/>ty
      <GameResult /> */}
    </>
  )
}

export default App
