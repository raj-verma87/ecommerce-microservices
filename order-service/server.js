const express = require("express");
const Order = require("./orderModel");
require("./database");

const app = express();
app.use(express.json());

app.post("/create", async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
});

app.get("/", async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
