const { Beverages, BeverageImages, Category } = require('../../Config/config');

class BeverageModel {
  static async GetAllBeverages() {
    const getAllBeverages = await Beverages.findAll({
      attributes: ['id', 'beverageName', 'description'],
      include: [
        {
          model: Category,
          attributes: ['category'],
        },
        {
          model: BeverageImages,
          attributes: ['id', 'image'],
        },
      ],
    });

    return new Promise((res, rej) => {
      try {
        res(getAllBeverages);
      } catch (error) {
        rej(error);
      }
    });
  }

  static async AddBeverage(data, categoryId) {
    const addBeverage = await Beverages.create({
      beverageName: data.beverageName,
      description: data.description,
      categoryId: categoryId,
    });
    return new Promise((res, rej) => {
      try {
        res(addBeverage);
      } catch (error) {
        rej(error);
      }
    });
  }

  static async AddBeverageImages(image, beverageId) {
    const addImage = await BeverageImages.create({
      image: image,
      beverageId: beverageId,
    });
    return new Promise((res, rej) => {
      try {
        res(addImage);
      } catch (error) {
        rej(error);
      }
    });
  }

  static async GetBeverage(id) {
    const getBeverage = await Beverages.findAll({
      attributes: ['id', 'beverageName', 'description'],
      include: [
        {
          model: Category,
          attributes: ['category'],
        },
        {
          model: BeverageImages,
          attributes: ['id', 'image'],
        },
      ],
      where: {
        id: id,
      },
    });

    return new Promise((res, rej) => {
      try {
        res(getBeverage);
      } catch (error) {
        rej(error);
      }
    });
  }

  static async GetBeverageByCategory(id) {
    const getBeverage = await Beverages.findAll({
      attributes: ['id', 'beverageName', 'description'],
      include: [
        {
          model: Category,
          attributes: ['category'],
          where: {
            id: id,
          },
        },
        {
          model: BeverageImages,
          attributes: ['id', 'image'],
        },
      ],
    });

    return new Promise((res, rej) => {
      try {
        res(getBeverage);
      } catch (error) {
        rej(error);
      }
    });
  }
}

module.exports = BeverageModel;
