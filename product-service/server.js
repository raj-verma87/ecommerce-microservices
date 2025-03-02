const express = require("express");
const Product = require("./productModel");
require("./database");

const app = express();
app.use(express.json());

app.post("/create", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

app.get("/", async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));
