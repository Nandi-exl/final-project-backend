require('dotenv').config();
require('./Config/db');
// require('./config/config');

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const BeverageRouter = require('./BeverageApi/BeverageRouter');
// const FoodRouter = require('./FoodApi/FoodRouter');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
  })
);

// app.use('/', BeverageRouter);
// app.use('/', FoodRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
