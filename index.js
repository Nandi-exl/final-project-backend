require('dotenv').config();
require('./Config/db');
// require('./config/config');

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const BeverageRouter = require('./BeverageApi/BeverageRouter');
const foodRouter = require('./Api/FoodApi/FoodRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
  })
);

// app.use('/', BeverageRouter);
app.use('/', foodRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
