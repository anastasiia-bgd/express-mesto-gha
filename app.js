const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');

const {
  MONGO_URL = 'mongodb://localhost:27017/mestodb',
  PORT = 3000,
} = process.env;

mongoose.connect(MONGO_URL);

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '646bdcd994f2c18b6548e771',
  };

  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
