const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes/router');

const {
  MONGO_URL = 'mongodb://localhost:27017/mestodb',
  PORT = 3000,
} = process.env;

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3001',
    'https://anastasiia.mesto.nomoredomains.rocks',
  ],
  credentials: true,
  maxAge: 30,
}));

app.use(express.json());

app.use(cookieParser());
mongoose.connect(MONGO_URL);

app.use('/', router);

app.use(errors());

app.use((error, req, res, next) => {
  const {
    status = 500,
    message,
  } = error;
  res.status(status)
    .send({
      message: status === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  return next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
