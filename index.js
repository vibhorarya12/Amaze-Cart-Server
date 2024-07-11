const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();  // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Connect to the database
const connect_db = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to database", error.message);
    process.exit(1);  // Exit process with failure
  }
};
connect_db();

// Routes
const router = require('./Routes');
app.use('/api', router);

app.get("/", (req, res) => {
  res.send("AmazeCart Shop Smart");
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).send("Route doesn't exist");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
