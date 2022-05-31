const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'mysql',
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('database connected');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
