const { Sequelize } = require('sequelize');
const sequelize = require('./db');

// const Role = sequelize.define(
//   'role',
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     role: {
//       type: Sequelize.STRING,
//     },
//   },
//   { freezeTableName: true }
// );

// const Users = sequelize.define(
//   'users',
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     password: {
//       type: Sequelize.TEXT,
//       allowNull: false,
//     },
//     refreshToken: {
//       type: Sequelize.TEXT,
//       allowNull: true,
//     },
//     role_id: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: 'role',
//         key: 'id',
//       },
//     },
//   },
//   {
//     freezeTableName: true,
//   }
// );

const Category = sequelize.define(
  'category',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
    },
  },
  { freezeTableName: true }
);

const Foods = sequelize.define(
  'foods',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    foodName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

// const Beverages = sequelize.define(
//   'beverages',
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     beverageName: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     category_id: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: 'category',
//         key: 'id',
//       },
//     },
//   },
//   { freezeTableName: true }
// );

const FoodImages = sequelize.define(
  'foodImages',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: Sequelize.STRING,
    },
    foodId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

// const BeverageImages = sequelize.define(
//   'beverageImages',
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     image: {
//       type: Sequelize.STRING,
//     },
//     beverage_id: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: 'beverages',
//         key: 'id',
//       },
//     },
//   },
//   { freezeTableName: true }
// );

// const FoodCategoryConnection = sequelize.define(
//   'food_category_connection',
//   {
//     food_id: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: 'foods',
//         key: 'id',
//       },
//     },
//     category_id: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: 'category',
//         key: 'id',
//       },
//     },
//   },
//   { freezeTableName: true }
// );

// const BeverageCategoryConnection = sequelize.define(
//   'beverage_category_connection',
//   {
//     beverage_id: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: 'beverages',
//         key: 'id',
//       },
//     },
//     category_id: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: 'category',
//         key: 'id',
//       },
//     },
//   },
//   { freezeTableName: true }
// );

// const FoodFavorite = sequelize.define(
//   'food_favorite',
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     user_id: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: 'users',
//         key: 'id',
//       },
//     },
//     food_id: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: 'foods',
//         key: 'id',
//       },
//     },
//   },
//   { freezeTableName: true }
// );

// const BeverageFavorite = sequelize.define(
//   'beverage_favorite',
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     user_id: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: 'users',
//         key: 'id',
//       },
//     },
//     beverage_id: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: 'beverages',
//         key: 'id',
//       },
//     },
//   },
//   { freezeTableName: true }
// );

//Association
//foods with category
Category.hasMany(Foods);
Foods.belongsTo(Category);

//foodswith image
Foods.hasMany(FoodImages);
FoodImages.belongsTo(Foods)

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log('database created');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = {
  // Role,
  // Users,
  Category,
  Foods,
  FoodImages,
  // FoodCategoryConnection,
  // FoodFavorite,
  // Beverages,
  // BeverageImages,
  // BeverageCategoryConnection,
  // BeverageFavorite,
};
