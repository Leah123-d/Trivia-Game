import { useState, useRef, useEffect } from 'react'
import './App.css'
import GameSetup from './components/GameSetup'
// import GamePlay from './components/GamePlay'
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



  const handleChange = (e) => {
    setGameValues ({
      ...gameValues,
      [e.target.name]: e.target.value
    })
  }

  const fetchGameSetup = async (e) => {
		e.preventDefault();
    console.log("Game values submitted:", gameValues);

    try{
    const response = await fetch(
      `/triviaGame?amount=${gameValues.amount}&category=${gameValues.category}&difficulty=${gameValues.level}&type=${gameValues.qtype}`); 
    
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("fetched data:", data);

    setGameData(data); //storing the API response
    }catch(error){
    console.error("error fetching data: ", error)
    
  }
  
}



  useEffect(() => {
    if(isSubmitted) {
      fetchGameSetup().then(() => setIsSubmitted(false));
    }
  }, [isSubmitted]);





  return (
    <>
    <GameSetup 
      amount={gameValues.amount}
      category={gameValues.category}
      level={gameValues.level}
      qtype={gameValues.qtype}
      onChange={handleChange} 
      onSubmit={fetchGameSetup} 
    />
    {gameData && <pre>{JSON.stringify(gameData, null, 2)}</pre>}
    
      {/* <GamePlay
     will use game data to feed into game play/>ty
      <GameResult /> */}
    </>
  )
}

export default App
