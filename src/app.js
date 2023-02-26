const express = require('express');
const session = require('express-session');
const app = express();
const routes = require('./routes');
const cors = require('cors');

require('dotenv').config();

const corsOption = {
  origin: true,
  credentials: true,
  withCredential: true,
  optionsSuccessStatus: 200,
  exposedHeaders: ['accesstoken', 'refreshtoken'],
};
app.use(cors(corsOption));
app.use(express.json());

const ErrorHandler = require('./middlewares/error.handler.middleware');
app.use(ErrorHandler);

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  })
);
app.use('/', routes);

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT, 'Server is running.');
});

app.get('/', (req, res) => {
  res.send(`TEST5 ${process.env.PORT}`);
});

module.exports = app;
