const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');
const auth = require('./middlewares/auth');

const {
  createUser,
  login,
} = require('./controllers/users');

const {
  MONGO_URL = 'mongodb://localhost:27017/mestodb',
  PORT = 3000,
} = process.env;

mongoose.connect(MONGO_URL);

const app = express();

app.use(express.json());
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use(router);

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
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
