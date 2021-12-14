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
    title: 'dune',
    description: 'sand',
    status: 'unread',
    email: 'fakeemail@fake.com'
  });

  await Book.create({
    title: 'twilight',
    description: 'sparkles',
    status: 'read',
    email: 'fakeemail@fake.com'
  });

  await Book.create({
    title: 'harry potter',
    description: 'scar',
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
