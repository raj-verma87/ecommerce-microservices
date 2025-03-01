const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database"); // ✅ Import the database connection
const User = require("./userModel"); // Import User model

const app = express();

// ✅ Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Check database connection before starting the server
sequelize.authenticate();

// ✅ User Registration Route
app.post("/register", async (req, res) => {
  try {
    console.log("Incoming request at /register:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.create({ name, email, password });
    console.log("User created:", user);

    res.status(201).json(user);
  } catch (error) {
    console.error("Error in /register:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Start User Service
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
