const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Product = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

sequelize.sync();
module.exports = Product;
