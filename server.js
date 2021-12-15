'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const Book = require('./bookModel.js')


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const db = mongoose.connection;
db.on('error' , console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('Mongoose is connected')
});

app.get('/test', (request, response) => {
  
  response.send('test request received')
  
})

app.get('/books', handleGetBooks)
mongoose.connect(process.env.DB_URL)

app.post('/books', handlePostBooks);

app.delete('/books/:id', handleDeleteBooks);

app.put('/books/:id', handlePutBooks);

async function handleGetBooks(req, res) {
 
  let emailFromClient = {}
  if (req.query.email) {
    emailFromClient.email = req.query.email
  }
  try {
    const booksFromDB = await Book.find(emailFromClient);
    if (booksFromDB.length > 0) {
      res.status(200).send(booksFromDB);
      console.log(booksFromDB);
    } else {
      res.status(404).send('no books found');
      console.log(booksFromDB);
    }
  } catch (e) {
    res.status(500).send('Server Error, try again');
  }
}

async function handlePostBooks(req, res){
  
  try {
    const addedBook = await Book.create(req.body)
    res.status(201).send(addedBook);
  }catch (e){
    res.status(500).send('Server Error, try again');
  }

}

async function handleDeleteBooks(req, res){
  const { id } = req.params;
  const { email } = req.query;
  // console.log(id);
  // res.send('test');
try {   
  const book = await Book.findOne({ _id: id, email });
  if (!book) res.status(400).send("unable to delete book")
  else {
    await Book.findByIdAndDelete(id);
    res.status(204).send('book deleted');
    console.log(id);
  }

} catch (error) {
  res.status(500).send('unable to delete: server side error');
}
}

async function handlePutBooks(req, res){

  const { id } = req.params;

  try {
    const addedBook = await Book.findByIdAndUpdate(id, req.body, { new: true, overwrite: true });
    res.status(200).send(addedBook);
  }catch (e){
    res.status(500).send('Server Error, try again');
  }

}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
