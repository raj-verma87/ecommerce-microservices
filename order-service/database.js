const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false, // Disable logging in production
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connected to MySQL - Order Service"))
  .catch((err) => console.error("DB Connection Error:", err));

module.exports = sequelize;
