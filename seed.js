const mongoose = require('mongoose');
const Book = require('./bookModel.js');
require('dotenv').config();

async function seed() {
  mongoose.connect(process.env.DB_URL)

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function () {
    console.log('Mongoose is connected playa')
  });

  await Book.create({
    title: 'Dune',
    description: 'Sand',
    status: 'unread',
    email: 'fakeemail@fake.com'
  });

  await Book.create({
    title: 'Twilight',
    description: 'Sparkles',
    status: 'read',
    email: 'fakeemail@fake.com'
  });

  await Book.create({
    title: 'Harry Potter',
    description: 'Scar',
    status: 'unread',
    email: 'fakeemail@fake.com'
  });

  // await myBook.save(function (err) {
  //     if (err) {
  //       console.log(err, 'boom');
  //     } else {
  //       console.log('saved by dave batista');
  //     }
  //   });

  mongoose.disconnect();
}

seed();
