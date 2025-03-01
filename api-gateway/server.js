const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());
app.use(require("cors")());

// Routes requests to services
app.use("/users", async (req, res) =>
  forwardRequest(req, res, "http://localhost:5001")
);
app.use("/products", async (req, res) =>
  forwardRequest(req, res, "http://localhost:5002")
);
app.use("/orders", async (req, res) =>
  forwardRequest(req, res, "http://localhost:5003")
);

async function forwardRequest(req, res, targetUrl) {
  try {
    const response = await axios({
      method: req.method,
      url: `${targetUrl}${req.url}`,
      data: req.body,
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error forwarding request:", error.message);

    res.status(error.response?.status || 500).json({ error: error.message });
  }
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
