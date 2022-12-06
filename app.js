require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

const connectDB = require('./db/connect');

const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');

//Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

//Route
app.use('/', indexRouter);
app.use('/api/v1/products', productsRouter);

//Products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Currently running on port ${PORT}.`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
