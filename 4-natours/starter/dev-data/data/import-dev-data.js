const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf8'));

const inmportData = async () => {
  try {
    await Tour.create(tours);
    console.log('data created');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  inmportData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

//node dev-data/data/import-dev-data.js --import comand to start in terminal
