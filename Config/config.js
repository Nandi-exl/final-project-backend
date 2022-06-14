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

const Users = sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    refreshToken: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

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

const Beverages = sequelize.define(
  'beverages',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    beverageName: {
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
  { freezeTableName: true }
);

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

const BeverageImages = sequelize.define(
  'beverageImages',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: Sequelize.STRING,
    },
    beverageId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

const FoodFavorite = sequelize.define(
  'food_favorite',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    foodId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

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

/*Association TABLE RELATION*/
//foods with category
Category.hasMany(Foods);
Foods.belongsTo(Category);

//foodswith image
Foods.hasMany(FoodImages);
FoodImages.belongsTo(Foods);

//Foods with FavoriteFood
Foods.hasMany(FoodFavorite);
FoodFavorite.belongsTo(Foods);

//beverage with category
Category.hasMany(Beverages);
Beverages.belongsTo(Category);

//beverage with image
Beverages.hasMany(BeverageImages);
BeverageImages.belongsTo(Beverages);

/* UNCOMMENT SETIAP SUDAH MEMBUAT TABLE PADA DATABASE */
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
  FoodFavorite,
  Beverages,
  BeverageImages,
  // BeverageFavorite,
};
