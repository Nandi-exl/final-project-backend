const express = require('express');
const foodRouter = express.Router();
const FoodController = require('../FoodApi/FoodController');
const { upload } = require('../../MIddleware/Uploadimage/UploadImg');

foodRouter.post('/add_category', FoodController.AddCategory);
foodRouter.post('/add-food', upload.array('images', 4), FoodController.AddFood);
foodRouter.get('/food', FoodController.GetAllFood);
foodRouter.get('/food/:id', FoodController.GetFood);
foodRouter.get('/images/:image', FoodController.GetFoodImages);
foodRouter.get('/food/category/:category', FoodController.GetFoodByCategory);
// foodRouter.get('/foodImage/:foodId', FoodController.GetImage) // get image from database
foodRouter.delete('/delete/:id', FoodController.DeleteFood);

foodRouter.post(
  '/add_to_favorite_food/:foodId',
  FoodController.AddFavoriteFood
);
foodRouter.get('/food/favorite/:userId', FoodController.GetFavFood);

module.exports = foodRouter;
