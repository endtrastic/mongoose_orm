//  Importing important stuff
import express from "express";
import mongoose from "mongoose";
import articleRouter from "./controllers/articleController"; 
import commentController from "./controllers/commentController";
import authorController from "./controllers/authorController"



const app = express();

app.use(express.json());


// Connecting to the mongodb
mongoose.connect('your_thing_here');
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});


// Using the different routes here
app.use("/", articleRouter); 

app.use('/', commentController);
app.use('/', authorController);


// port
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
