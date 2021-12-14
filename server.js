'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const Book = require('./bookModel.js')

const app = express();
app.use(cors());

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


app.listen(PORT, () => console.log(`listening on ${PORT}`));
