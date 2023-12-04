const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const paymentRoutes = require("./routes/paymentRoutes");
const { mongoURI } = require("./config/database");
const subscribe=require('./controllers/Async/subscriber')
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: false })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
app.use("/api/payments", paymentRoutes);

subscribe.subscribe();
subscribe.subscribeVote();

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
