const {
  Foods,
  FoodImages,
  FoodFavorite,
  Category,
  Users,
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
          attributes: ['id', 'image', 'publicId'],
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
          attributes: ['id', 'image', 'publicId'],
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

  static async GetAllFoodByCategory(category) {
    const getFood = await Foods.findAll({
      attributes: ['id', 'foodName', 'description'],
      include: [
        {
          model: Category,
          attributes: ['category'],
          where: {
            category: category,
          },
        },
        {
          model: FoodImages,
          attributes: ['id', 'image', 'publicId'],
        },
      ],
    });

    return new Promise((res, rej) => {
      try {
        res(getFood);
      } catch (error) {
        rej(error);
      }
    });
  }

  static async GetImage(foodId) {
    const getImage = await FoodImages.findAll({
      attributes: ['image'],
      where: {
        foodId: foodId,
      },
    });

    return new Promise((res, rej) => {
      try {
        res(getImage);
      } catch (error) {
        rej(error);
      }
    });
  }

  static async DeleteFood(id) {
    const delFood = await Foods.destroy({
      where: {
        id: id,
      },
    }).then(async () => {
      await FoodImages.destroy({
        where: {
          foodId: id,
        },
      });
    });

    return new Promise((res, rej) => {
      try {
        res(delFood);
      } catch (error) {
        rej(error);
      }
    });
  }

  static async AddToFavoriteFood(foodId, userId) {
    const addFavFood = await FoodFavorite.create({
      foodId: foodId,
      userId: userId,
    });

    return new Promise((res, rej) => {
      try {
        res(addFavFood);
      } catch (error) {
        rej(error);
        console.log('error adding favorite food', error);
      }
    });
  }

  static async GetFavFood(userId) {
    const getFavFoods = await FoodFavorite.findAll({
      attributes: [''],
      include: {
        model: Foods,
        attributes: ['id', 'foodName', 'description'],
        include: {
          model: Category,
          attributes: ['category'],
        },
        include: {
          model: FoodImages,
          attributes: ['id', 'image', 'publicId'],
        },
      },
      include: {
        model: Users,
        attributes: ['id', 'name'],
        where: {
          id: userId,
        },
      },
    });

    return new Promise((res, rej) => {
      try {
        res(getFavFoods);
      } catch (error) {
        rej(error);
      }
    });
  }
}

module.exports = FoodModel;
