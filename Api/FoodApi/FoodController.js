const FoodModel = require('./FoodModel');
const { uploadFile, getFileStream } = require('../../s3');

class FoodController {
  static async AddCategory(req, res) {
    const body = req.body;
    const result = await FoodModel.AddCategory(body);
    res.status(201).json(result);
  }

  static async AddFood(req, res, next) {
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
      const res = await uploadFile(req.files);
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
}

module.exports = FoodController;
