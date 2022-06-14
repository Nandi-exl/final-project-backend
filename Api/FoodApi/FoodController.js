const FoodModel = require('./FoodModel');
const {
  uploadFile,
  getFileStream,
  deleteFile,
} = require('../../MIddleware/AwsBucket/s3');
const { Foods } = require('../../Config/config');

class FoodController {
  static async AddCategory(req, res) {
    const body = req.body;
    const result = await FoodModel.AddCategory(body);
    res.status(201).json(result);
  }

  static async AddFood(req, res) {
    const data = req.body;
    let category = req.body.categoryId;

    if (category == 'breakfast') {
      category = 1;
    } else if (category == 'lunch') {
      category = 2;
    } else if (category == 'dinner') {
      category = 3;
    }
    const result = await FoodModel.AddFood(data, category);

    if (result) {
      uploadFile(req.files);
      const img = req.files.map((file) => file.filename);

      //loop so it will excute the image more than once
      for (let i = 0; i < img.length; i++) {
        await FoodModel.AddFoodImages(
          `http://localhost:5000/images/${img[i]}`,
          result.id
        );
      }
    }
    res.status(201).json({ msg: 'food added successful' });
  }

  static async GetAllFood(req, res) {
    const result = await FoodModel.GetAllFoods();
    res.status(200).json(result);
  }

  static async GetFood(req, res) {
    const id = req.params.id;
    const result = await FoodModel.GetFood(id);
    res.status(200).json(result);
  }

  static async GetFoodImages(req, res) {
    const image = req.params.image;
    const readStream = getFileStream(image);
    //note do not use res.status here it will impact the image result
    readStream.pipe(res);
  }

  static async GetFoodByCategory(req, res) {
    const id = req.params.id;
    const result = await FoodModel.GetAllFoodByCategory(id);
    res.status(200).json(result);
  }

  static async GetImage(req, res) {
    const foodId = req.params.foodId;
    const result = await FoodModel.GetImage(foodId);
    res.status(200).json(result);
  }

  static async DeleteFood(req, res) {
    const key = req.params.id;
    const image = [];
    const fileKey = await FoodModel.GetImage(key);
    fileKey.map((img) => {
      image.push(img.image.slice(29));
    });

    for (let i = 0; i < image.length; i++) {
      await deleteFile(image[i]);
    }

    await FoodModel.DeleteFood(key);
    res.status(200).json({ msg: `file is deleted` });
  }

  static async AddFavoriteFood(req, res) {
    const id = req.params.foodId;
    const food = await FoodModel.GetFood(id);
    const foodId = food[0].dataValues.id;
    if (food) {
      await FoodModel.AddToFavoriteFood(foodId);
    }
    res.status(203).json({ msg: `${food.foodName} is added to favorite` });
  }

  static async GetFavFood(req, res) {
    const foodId = req.params.foodId
    const getFavFood = await FoodModel.GetFavFood(foodId)
    res.status(200).json(getFavFood)
  }
}

module.exports = FoodController;
