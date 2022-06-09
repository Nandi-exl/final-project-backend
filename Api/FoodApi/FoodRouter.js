const express = require('express');
const foodRouter = express.Router();
const FoodController = require('../FoodApi/FoodController');
const { upload } = require('./FoodMid');

foodRouter.post('/add_category', FoodController.AddCategory);
foodRouter.post('/add-food', upload.array('images', 4), FoodController.AddFood);
foodRouter.get('/food', FoodController.GetAllFood)
foodRouter.get('/food/:id', FoodController.GetFood);
foodRouter.get('/images/:image', FoodController.GetFoodImages);
module.exports = foodRouter;
