import express from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json()) //Middleware to parse JSON

// const { authToken } = process.env;

// app.get('/', (req,res) => {
//   res.send("Hello! Welcome to the server!")
// })




app.listen(port, () => {
  console.log(`Server is listening port ${port}`)

});