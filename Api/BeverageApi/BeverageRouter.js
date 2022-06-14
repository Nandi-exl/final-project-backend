const express = require('express');
const beverageRouter = express.Router();
const BeverageController = require('./BeverageController');
const { upload } = require('../../MIddleware/Uploadimage/UploadImg');

beverageRouter.post(
  '/add-beverage',
  upload.array('images', 4),
  BeverageController.AddBeverage
);
beverageRouter.get('/beverage', BeverageController.GetAllBeverages);
beverageRouter.get('/beverage/:id', BeverageController.GetBeverage);
beverageRouter.get('/images/:image', BeverageController.GetBeverageImages);
beverageRouter.get('/beverage/category/:id', BeverageController.GetBeverageByCategory)
module.exports = beverageRouter;
