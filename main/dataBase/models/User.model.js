
const Sequelize = require('sequelize');
const { sequelize } = require("..");
const TODO = require('./ToDo.model');
const Token = require('./Token.model');

class User extends Sequelize.Model {}


User.init(
  {
    id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "username",
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "user" }
);

User.hasMany(ToDo);
ToDo.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Token);
Token.belongsTo(User,
   {
     foreignKey: "userId",
    });
    
module.exports = User;
