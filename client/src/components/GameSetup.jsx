import { useState } from 'react'


function GameSetup ({amount,category,level,qtype,onChange,onSubmit}) {

  const handleSubmit = (e) =>{
    e.preventDefault();
    onSubmit(e);
  }

  //the function to handle dropdown selection
  const handleClick = (name,value) => {
    const event = {
      target: {
        name: name,
        value: value,
      }
    };
    onChange(event); //passing the events to the onChange

    if(qtype.value === boolean ){
      input.lvlHard.disabled = "true";
    }
  };


  return (
   <>
   <div>
    <h1>Setup your Game!</h1>
    <form onSubmit={handleSubmit}>
        <label htmlFor='amount'>How many questions?</label>
        <input  
              type="number" 
              id="amount"
              name="amount"
              value={amount}
              onChange={onChange}
              required 
              placeholder="Type a number between 1 to 12" 
              min="1" 
              max="12" 
             />
        <details className="dropdown" >
        <summary className="btn m-1">category</summary>
        <ul 
          className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        <li
          id="category"
          name="category" 
          onClick={ () => handleClick("category", "17") }
        
        ><a>Science & Nature</a></li>

        <li
         id="category"
         name="category" 
         onClick={ () => handleClick("category","18") }

        ><a>Science: Computers</a></li>
        </ul>
        </details>

        <details className="dropdown" >
        <summary className="btn m-1">question type</summary>
        <ul 
          className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        <li
          name="boolean" 
          onClick={ () => handleClick("qtype","boolean") }
        
        ><a>True/False</a></li>

        <li
         name="multi" 
         onClick={ () => handleClick("qtype","multiple") }

        ><a>multiple choice</a></li>
        </ul>
        </details>

        <label htmlFor="lvlEasy">easy</label>
        <input 
                type="radio" 
                id="lvlEasy" 
                name="level"
                value="easy" 
                onChange={onChange}/>
        <label htmlFor="lvlMed">med</label>        
        <input 
                type="radio" 
                id="lvlMed" 
                name="level"
                value="medium"
                onChange={onChange}/>
        <label htmlFor="lvlHard">hard</label>        
        <input 
                type="radio" 
                id="lvlHard"
                name="level"  
                value="hard"
                disabled = "false"
                onChange={onChange}/>
        
      <button className="btn btn-soft btn-primary">Create Game</button> 
    </form>
    </div>
   </>

  )
}

export default GameSetup