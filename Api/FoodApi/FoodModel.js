const {
  Foods,
  FoodImages,
  // FoodFavorite,
  Category,
} = require('../../Config/config');

class FoodModel {
  static async GetAllFoods() {
    const getAllFood = await Foods.findAll({
      attributes: ['id', 'foodName', 'description'],
      include: [
        {
          model: Category,
          attributes: ['category'],
        },
        {
          model: FoodImages,
          attributes: ['id', 'image'],
        },
      ],
    });

    return new Promise((res, rej) => {
      try {
        res(getAllFood);
      } catch (error) {
        rej(error);
      }
    });
  }

  static async AddCategory(data) {
    const addCategory = await Category.create({
      category: data.category,
    });
    return new Promise((res, rej) => {
      try {
        res(addCategory);
      } catch (error) {
        rej(error);
      }
    });
  }

  static async AddFood(data, categoryId) {
    const addFood = await Foods.create({
      foodName: data.foodName,
      description: data.description,
      categoryId: categoryId,
    });
    return new Promise((res, rej) => {
      try {
        res(addFood);
      } catch (error) {
        rej(error);
      }
    });
  }

  static async AddFoodImages(image, foodId) {
    const addImage = await FoodImages.create({
      image: image,
      foodId: foodId,
    });
    return new Promise((res, rej) => {
      try {
        res(addImage);
      } catch (error) {
        rej(error);
      }
    });
  }

  static async GetFood(id) {
    const getFood = await Foods.findAll({
      attributes: ['id', 'foodName', 'description'],
      include: [
        {
          model: Category,
          attributes: ['category'],
        },
        {
          model: FoodImages,
          attributes: ['id', 'image'],
        },
      ],
      where: {
        id: id,
      },
    });

    return new Promise((res, rej) => {
      try {
        res(getFood);
      } catch (error) {
        rej(error);
      }
    });
  }
}

module.exports = FoodModel;
