const path = require('path');
const{ Sequielize } = require('sequelize');

const sequielize = new Sequielize({
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    database: '',
    username: 'postgres',
    password: 'xeee',
  });

  const initDB = async () => {
      try {
          await sequielize.authenticate();
          await sequielize.sync();
          console.log('Sequelize was inited');
      } catch (error) {
          console.log(error);
          process.exit();
      }
  };

  module.exports = {
      sequielize,
      initDB,
  };