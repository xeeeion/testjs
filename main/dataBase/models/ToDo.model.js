const Sequelize = require("sequelize");
const { sequelize } = require("..");

class TODO extends Sequelize.Model {}

TODO.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      //defaultValue: "Description",
    },
    isCompleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isFavourite: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "todo" }
);

module.exports = TODO;
