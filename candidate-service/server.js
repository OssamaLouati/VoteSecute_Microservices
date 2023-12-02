const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const electionRoutes = require('./routes/electionRoutes');
const subscribe=require("./controllers/Async/subscriber")
const app = express();




// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/my-db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.error('MongoDB connection error:', error));

// Use routes
app.use(electionRoutes);
//subscribe.subscribe();
const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Election service running on http://localhost:${PORT}`);
});
