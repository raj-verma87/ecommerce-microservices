const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json()); // ✅ Correctly parse JSON in incoming requests

app.use("/users", async (req, res) => {
  const userServiceUrl = "http://localhost:5001";

  try {
    console.log(
      `Forwarding request to User Service: ${userServiceUrl}${req.url}`
    );

    const response = await axios({
      method: req.method,
      url: `${userServiceUrl}${req.url}`,
      data: req.body,
      headers: { "Content-Type": "application/json" },
      timeout: 10000, // ✅ Increase timeout to 10s
    });

    console.log("Response received from User Service:", response.data);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error forwarding request:", error.message);

    if (error.response) {
      console.error("User Service Response Error:", error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else if (error.code === "ECONNREFUSED") {
      res.status(500).json({ error: "User Service is not reachable" });
    } else if (error.code === "ECONNABORTED") {
      res.status(500).json({ error: "Request timed out" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// Start API Gateway
const PORT = 4000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
