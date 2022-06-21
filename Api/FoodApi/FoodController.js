const FoodModel = require('./FoodModel');
const UserModel = require('../UserApi/UserModel');
const {
  uploadFile,
  getFileStream,
  deleteFile,
} = require('../../MIddleware/AwsBucket/s3');

const { uploadImages } = require('../../MIddleware/cloudinary/cloudinary');

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
      //s3 upload file
      // uploadFile(req.files);
      const img = req.files.map((file) => file.filename);

      //cloudinary
      const addImage = [];
      let dt;
      const imgPath = req.files.map((file) => file.path);
      for (let i = 0; i < imgPath.length; i++) {
        dt = await uploadImages(imgPath[i]);
        addImage.push(FoodModel.AddFoodImages(dt.url, result.id));
      }
      await Promise.all(addImage);

      //S3 Bucket AWS
      //store the image first then push it only once s3
      // const addImage = [];
      // for (let i = 0; i < img.length; i++) {
      //   addImage.push(
      //     FoodModel.AddFoodImages(
      //       `http://localhost:5000/images/${img[i]}`,
      //       result.id
      //     )
      //   );
      // }
      // await Promise.all(addImage);
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
    const category = req.params.category;
    const result = await FoodModel.GetAllFoodByCategory(category);
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
    const userId = req.params.userId;
    const getFavFood = await FoodModel.GetFavFood(userId);
    res.status(200).json(getFavFood);
  }
}

module.exports = FoodController;
