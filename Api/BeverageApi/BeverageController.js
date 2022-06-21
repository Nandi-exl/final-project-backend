const BeverageModel = require('./BeverageModel');
const { uploadFile, getFileStream } = require('../../MIddleware/AwsBucket/s3');

class BeverageController {
  static async AddBeverage(req, res) {
    const data = req.body;
    let category = req.body.categoryId;

    if (category == 'alkohol') {
      category = 4;
    } else if (category == 'non-alkohol') {
      category = 5;
    }
    const result = await BeverageModel.AddBeverage(data, category);

    if (result) {
      uploadFile(req.files);
      const img = req.files.map((file) => file.filename); //img = [more key tu upload to db]

      //loop so it will excute the image more than once
      for (let i = 0; i < img.length; i++) {
        await BeverageModel.AddBeverageImages(
          `http://localhost:5000/images/${img[i]}`,
          result.id
        );
      }
    }
    res.status(201).json({ msg: 'beverage added successful' });
  }

  static async GetAllBeverages(req, res) {
    const result = await BeverageModel.GetAllBeverages();
    res.status(200).json(result);
  }

  static async GetBeverage(req, res) {
    const id = req.params.id;
    const result = await BeverageModel.GetBeverage(id);
    res.status(200).json(result);
  }

  static async GetBeverageImages(req, res) {
    const image = req.params.image;
    const readStream = getFileStream(image);
    //note do not use res.status here it will impact the image result
    readStream.pipe(res);
  }


  static async GetBeverageByCategory(req, res){
    const category = req.params.category;
    const result = await BeverageModel.GetBeverageByCategory(category);
    res.status(200).json(result)
  }
}

module.exports = BeverageController;
