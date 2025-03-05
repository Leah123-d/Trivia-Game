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

  const handleChange = (e) => {
    setGameValues ({
      ...gameValues,
      [e.target.name]: e.target.value
    })
  }

  const fetchGameSetup = async (e) => {
		e.preventDefault();
    try{
    const response = await fetch(`/gameSetup?amount=${gameValues.amount}&category=${gameValues.category}&difficulty=${gameValues.level}&type=${gameValues.qtype}`); 
    const data = await response.json();
    return setGameValues(data); //I think these needs to be a map
    }catch(error){
    console.error("error fetching data: ", error)
  }}

  // useEffect(() => {
  //   fetchGameSetup();

  // },);


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
    
    {/* <GamePlay />
    <GameResult /> */}
    </>
  )
}

export default App
