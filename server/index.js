import express from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json()) //Middleware to parse JSON

// const { authToken } = process.env;

// app.get('/triviaGame', (req,res) => {
//   res.send("Hello! Welcome to the server!") // I think this would be sending to the front end. 
// })

app.get('/api/archives', async (req,res) => { //creates an endpoint for the route/api
  console.log('API request received for archive');

  const { date } = req.query //this will search the request for this date 

  if(!date) {
    return res.status(400).json({error: "Date required!"});
  }

  try{
    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${authToken}`) //get the URL and pass it to the fetch function as a string
    //date will be dynamic, however, let's test route first
    //once the fetch resolves we have to check if the response is okay

    const data = await response.json();//the response is converted to json and this returns a promise 
    console.log("sending data to the front end: ", data);
    res.json(data); // Return the fetched data

  }
  catch(error){
    console.error("Error fetching data: ", error);
    return { error: error.message}
  }
});


app.get('/', (req,res) => {
  res.json("Hello! Welcome to the server!") //response .json is returning to the local host/ the url set
})

app.listen(port, () => {
  console.log(`Server is listening port ${port}`)

});