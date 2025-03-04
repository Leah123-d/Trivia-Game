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

app.get('/', (req,res) => {
  res.json("Hello! Welcome to the server!") //response .json is returning to the local host/ the url set
})

app.listen(port, () => {
  console.log(`Server is listening port ${port}`)

});