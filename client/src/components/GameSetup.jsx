import { useState, useRef } from 'react'


function GameSetup ({amount,category,level,qtype,onChange,onSubmit}) {


  const handleSubmit = (e) =>{
    e.preventDefault();
    onSubmit(e);
    console.log(amount,category,level,qtype)    
  }

 


  return (

   <>
    <form onSubmit={handleSubmit}>
        <label htmlFor='input validator'>How many questions?</label>
        <input  
              type="number" 
              className="input validator" 
              required placeholder="Type a number between 1 to 12" 
              min="1" 
              max="12" 
              title="Must be between be 1 to 12"
              name="amount"
              value={amount}
              onChange={onChange}/>
        <p className="validator-hint">number needs to be 1 to 12</p>
        <label htmlFor="category">category</label>
        <input name="category" type="text" id="category" value={category} onChange={onChange}></input>

        <label htmlFor="level">level</label>
        <input name="level" type="text" id="level" value={level} onChange={onChange}></input>

        <label htmlFor="qtype">qtype</label>
        <input name="qtype" type="text" id="qtype" value={qtype} onChange={onChange}></input>
      

      
      {/* <details className="dropdown">
      <summary className="btn m-1">Select a category</summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
        <li><a>Item 3</a></li>
      </ul>
      </details>

      <div className="level">
    
        <label htmlFor="lvlEasy">Easy</label>
        <input id="lvlEasy" type="radio"></input>
       
        <label htmlFor="lvlMed" >Medium</label>
        <input id="lvlMed" type="radio"></input>

        <label htmlFor="lvlHard">Hard</label>
        <input id="lvlHard" type="radio"></input>
  
      </div>*/}
      <button className="btn btn-soft btn-primary">Create Game</button> 
      </form>
   </>

  )
}

export default GameSetup