const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtExeption', (err) => {
  console.log('Uncaught Exeption! 💥 Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModifyIndex: false,
  })
  .then(() => console.log('connected to DB'));
const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('app running');
});
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
