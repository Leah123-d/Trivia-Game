import express from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json()) //Middleware to parse JSON



app.get('/', (req,res) => {
  res.send("Hello! Welcome to the server!") // I think this would be sending to the front end. 
})

// https://opentdb.com/api.php?amount=12&category=30&difficulty=easy&type=multiple
// https://opentdb.com/api.php?amount=12&category=18&difficulty=medium&type=boolean

app.get('/triviaGame', async (req,res) => { //creates an endpoint for the route/api
  console.log('API request received for game setup');

  const { amount, 
          category, 
          difficulty, 
          type } = req.query 
  //this will search the request for these parameters. 
  //the query parameters need to match the query paramataers from the front end to extract them correctly

  console.log(amount, category, difficulty, type)

  if(!amount && !category && !difficulty && !type){
    return res.status(400).json({error: "paramaters required!"});
  }

  try{
    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`) 
    //get the URL and pass it to the fetch function as a string
    //date will be dynamic, however, let's test route first
    //once the fetch resolves we have to check if the response is okay

    console.log(response);

    const data = await response.json();//the response is converted to json and this returns a promise 
    console.log("sending data to the front end: ", data);
    res.json(data); // Return the fetched data

  }
  catch(error){
    console.error("Error fetching data: ", error);
    return { error: error.message}
  }
});


app.listen(port, () => {
  console.log(`Server is listening port ${port}`)

});