const express = require("express");
const cors = require("cors");

const { processData } = require("./logic");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check (optional, helps debugging)
app.get("/", (req, res) => {
  res.send("BFHL API is running 🚀");
});

// Main API
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body?.data || [];

    const result = processData(data);

    res.json({
      user_id: "soumyasingh_18112004", // change this
      email_id: "ss1869@srmist.edu.in",   // change this
      college_roll_number: "RA2311030020139", // change this
      ...result
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong"
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});