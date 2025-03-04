import { useState, useRef } from 'react'
import './App.css'
import GameSetup from './components/GameSetup'
// import GamePlay from './components/GamePlay'
// import GameResult from './components/GameResult'

function App() {
  const [setup, setSetup] = useState({
    amount: 0,
    category: 0,
    level: "",
    qtype:"",
  })

  // const gameSetupValues =(e) => {

    
  // }



  // const fetchGameSetup = async (e) => {
	// 	e.preventDefault();
  //   try{
  //   const response = await fetch(`/api/gameSetup?amount=${setup.amount}&category=${setup.category}&difficulty=${setup.level}&type=${setup.qtype}`); 
    
  //   const data = await response.json();
  //   return setSetup(data); //store data in state 
  //   }catch(error){
  //   console.error("error fetching data: ", error)
  // }}


  return (
    <>
    <GameSetup 
    // data={data}
    />
    
    {/* <GamePlay />
    <GameResult /> */}
    </>
  )
}

export default App
