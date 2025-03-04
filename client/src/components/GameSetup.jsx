import { useRef } from 'react'


function GameSetup ({data}) {
  
  // const amount = useRef(data.amount);
  // const category = useRef(data.category);
  // const level = useRef(data.level);
  // const qtype = useRef(data.qtype);

  const handleSubmit = (e) =>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = formData.get("amount")
    for(let[key, value] of formData.entries()){
      console.log(key,value)
    }
  }



  return (

   <>
   <form onSubmit={handleSubmit}>
      <label htmlFor='input validator'>How many questions?</label>
      <input  type="number" 
            className="input validator" 
            required placeholder="Type a number between 1 to 12" 
            min="1" 
            max="10" 
            title="Must be between be 1 to 12"
            name="amount"/>
      <p className="validator-hint">number needs to be 1 to 12</p>
      {/* <lable htmlFor="category"></lable>
      <input type="text" name="category" id="category" placeholder='enter category'></input> */}
      <button className="btn btn-soft btn-primary">Create Game</button>

    </form>
   </>

  )
}

export default GameSetup